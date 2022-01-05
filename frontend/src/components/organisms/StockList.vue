<template>
  <div class="stocks-list">
    <el-table
      v-loading="isLoading"
      :data="tableData"
      class="stocks-list__table"
      style="width: 100%">
      <el-table-column style="padding: 0">
        <template #header>
          <el-input v-model="search" class="stocks-list__search" placeholder="Поиск" size="small" />
        </template>
        <template #default="scope">
          <div class="stocks-list__item-link">
            <router-link :to="`/stocks/${scope.row.market}:${cleanTicker(scope.row.ticker)}`">
              <div
                class="stocks-list__item-logo"
                :style="`
                  background: url(https://yastatic.net/s3/fintech-icons/1/i/${cleanTicker(scope.row.ticker)}.svg), #F3F3F3;
                `" />
              <div class="stocks-list__item-ticker" >{{ cleanTicker(scope.row.ticker) }}</div>
            </router-link>
            <div class="stocks-list__item-name" >{{ scope.row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div
            @click="setSortType('PRICE')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('PRICE')">
            Цена
          </div>
        </template>
        <template #default="scope">
          <div>
            {{ scope.row.price }}
            {{ ({ USD: '$', RUB: '₽'})[scope.row.currency] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CHANGE')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('CHANGE')">
            Изменение
          </div>
        </template>
        <template #default="scope">
          <div class="stocks-list__item-change"
          :class="{
            'stocks-list__item-change_increased': scope.row.change > 0,
            'stocks-list__item-change_decreased': scope.row.change < 0,
          }">
            {{ scope.row.change }}%
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CAP')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('CAP')">
            Капитализация
          </div>
        </template>
        <template #default="scope">
          {{ formatCap(scope.row.cap) }}
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('VOLUME')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('VOLUME')">
            Объём
          </div>
        </template>
        <template #default="scope">
          <div v-if="scope.row.volume" class="stocks-list__item-change"
          :class="{
            'stocks-list__item-change_increased': scope.row.change > 0,
            'stocks-list__item-change_decreased': scope.row.change < 0,
          }">
            {{ formatCap(scope.row.volume) }}
          </div>
          <template v-else>-</template>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('VOLUME_TO_CAP')"
            class="stocks-list__item-filter"
            :class="getSortActiveClassConstructor('VOLUME_TO_CAP')">
            Объём / Кап.
          </div>
        </template>
        <template #default="scope">
          <div v-if="scope.row.cap && scope.row.volume" class="stocks-list__item-change"
          :class="{
            'stocks-list__item-change_increased': scope.row.change > 0,
            'stocks-list__item-change_decreased': scope.row.change < 0,
          }">
            {{ scope.row.volumeToCap }}%
          </div>
          <template v-else>-</template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      v-if="tableData.length"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentPageChange"
      :page-size="pageSize"
      v-model:currentPage="currentPage"
      :total="fitSearch.length" />
  </div>
</template>

<script>

const SORT_TYPES = ['NAME', 'PRICE', 'CHANGE', 'CAP', 'VOLUME', 'VOLUME_TO_CAP']
  .reduce((t, i) => ({ ...t, [i]: i }), {});

export default {
  name: 'StockList',
  props: {
    stocks: Array,
    isLoading: Boolean,
  },
  data() {
    return {
      search: this.$route.query.search || '',
      currentPage: +this.$route.query.page || 1, // почему-то не работает ни в какую
      pageSize: 20,
      sortType: this.$route.query.sort_by || SORT_TYPES.CAP,
      sortStage: this.$route.query.sort_stage || 1,
    };
  },
  methods: {
    fixQueryState() {
      this.$router.push({
        path: '/stocks/',
        query: {
          page: this.currentPage || undefined,
          search: this.search || undefined,
          sort_by: this.sortType === SORT_TYPES.CAP ? undefined : this.sortType,
          sort_stage: this.sortStage === 1 ? undefined : this.sortStage,
        },
      });
    },
    sortTable(a, b) {
      switch (this.sortType) {
        case SORT_TYPES.PRICE:
          return [
            b.price - a.price,
            a.price - b.price][this.sortStage - 1];
        case SORT_TYPES.VOLUME: {
          const aVol = a.volume || 0;
          const bVol = b.volume || 0;
          return [
            bVol - aVol,
            aVol - bVol][this.sortStage - 1];
        }
        case SORT_TYPES.VOLUME_TO_CAP:
          return [
            b.volumeToCap - a.volumeToCap,
            a.volumeToCap - b.volumeToCap][this.sortStage - 1];
        case SORT_TYPES.CHANGE:
          return [
            b.change - a.change,
            a.change - b.change][this.sortStage - 1];
        case SORT_TYPES.CAP: {
          const aCap = a.cap || 0;
          const bCap = b.cap || 0;
          return [
            bCap - aCap,
            aCap - bCap][this.sortStage - 1];
        }
        case SORT_TYPES.NAME:
        default:
          return [
            a.name.localeCompare(b.name),
            b.name.localeCompare(a.name)][this.sortStage - 1];
      }
    },
    setSortType(type) {
      switch (this.sortStage) {
        case 1:
          if (this.sortType === type) {
            this.sortStage = 2;
          } else {
            this.sortStage = 1;
            this.sortType = type;
          }
          break;
        case 2:
          if (this.sortType === type) {
            this.sortStage = 1;
            this.sortType = SORT_TYPES.CAP;
          } else {
            this.sortStage = 1;
            this.sortType = type;
          }
          break;
        case 0:
        default:
          this.sortStage = 1;
          this.sortType = SORT_TYPES.CAP;
      }

      this.currentPage = 1;
      this.handleCurrentPageChange(1);
    },
    formatCap(value) {
      let cap = { value, measure: '' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'K' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'M' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'B' };
      if (cap.value / 1000 >= 1) cap = { value: cap.value / 1000, measure: 'T' };

      return value
        ? `${new Intl.NumberFormat('en', { fraction: 3 }).format(cap.value)} ${cap.measure}`
        : '-';
    },
    cleanTicker(ticker) {
      return ticker.replace(/@.*$/g, '');
    },
    getLogoURL(index) {
      const ticker = this.cleanTicker(this.getStock(index).ticker);
      return `https://yastatic.net/s3/fintech-icons/1/i/${ticker}.svg`;
    },
    getAbsoluteIndex(index) {
      return index + (this.currentPage - 1) * this.pageSize;
    },
    getStock(index) {
      return this.stocks[this.getAbsoluteIndex(index)];
    },
    handleCurrentPageChange(page) {
      this.$router.push({ path: '/stocks/', query: { page } });
      window.scrollTo({
        top: 61 + 16,
        behavior: 'smooth',
      });
    },
    getSortActiveClassConstructor(sortType) {
      return {
        'stocks-list__item-filter_active': sortType === this.sortType && this.sortStage,
        'stocks-list__item-filter_up': sortType === this.sortType && this.sortStage === 1,
        'stocks-list__item-filter_down': sortType === this.sortType && this.sortStage === 2,
      };
    },
  },
  computed: {
    sortedTable() {
      return [...this.stocks].sort(this.sortTable);
    },
    fitSearch() {
      return this.sortedTable
        .filter((data) => (
          `${data.ticker}/${data.name}`
            .toLowerCase()
            .includes(this.search.toLowerCase())));
    },
    tableData() {
      const result = this.search
        ? this.fitSearch
        : this.sortedTable.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize,
        );
      this.fixQueryState();
      return result;
    },
  },
};
</script>

<style lang="scss">
  .stocks-list {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 16px;

    a {
      color: lightseagreen;
      text-decoration: none;
    }

    &__search {
      margin-right: 50px;
    }

    &__table {
      min-height: 450px;
      .cell {
        white-space: nowrap;
        line-height: 1;
        margin: -1px;
      }
    }

    .el-table_1_column_1 .cell {
      padding-left: 1px;
    }

    &__item {
      &-link{
        display: inline-grid;
        align-items: center;
        grid-auto-flow: column;
        grid-gap: 8px;
        line-height: 1;

        a {
          display: grid;
          grid-auto-flow: column;
          justify-content: space-between;
          align-items: center;
          grid-gap: 8px;
        }
      }

      &-logo {
        border: 1px solid #E8E8E8;
        width: 25px;
        height: 25px;
        border-radius: 25px;
      }

      @media (max-width: 991px) {
        &-name{
          display: none;
        }
      }

      &-filter {
        cursor: pointer;
        transition: 0.3s;
        &:hover, &_active {
          color: lightseagreen;
        }

        &_up::after{
          content: '↑';
        }
        &_down::after{
          content: '↓';
        }
      }

      &-change {
        &_increased {
          color: green;
        }
        &_decreased {
          color: red;
        }
      }
    }
  }
</style>
