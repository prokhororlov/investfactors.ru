<template>
  <div class="stock-list">
    <el-table
      v-loading="!tableData.length"
      :data="tableData"
      class="stock-list__table"
      style="width: 100%">
      <el-table-column width="45" style="padding: 0">
        <template #default="scope">
          <div
            class="stock-list__item-logo"
            :style="`background: url(https://yastatic.net/s3/fintech-icons/1/i/${cleanTicker(scope.row.ticker)}.svg), #F3F3F3;`"
          />
        </template>
      </el-table-column>
      <el-table-column label="Тикер" width="70">
        <template #default="scope">
          {{cleanTicker(scope.row.ticker) }}
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div
            @click="setSortType('NAME')"
            class="stock-list__item-filter"
            :class="getSortActiveClassConstructor('NAME')">
            Название
          </div>
        </template>
        <template #default="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div
            @click="setSortType('PRICE')"
            class="stock-list__item-filter"
            :class="getSortActiveClassConstructor('PRICE')">
            Цена
          </div>
        </template>
        <template #default="scope">
          <div>
            {{ scope.row.price }}
          </div>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CHANGE')"
            class="stock-list__item-filter"
            :class="getSortActiveClassConstructor('CHANGE')">
            Изменение
          </div>
        </template>
        <template #default="scope">
          <div class="stock-list__item-change"
          :class="{
            'stock-list__item-change_increased': scope.row.change > 0,
            'stock-list__item-change_decreased': scope.row.change < 0,
          }">
            {{ scope.row.changePercent }}%
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CAP')"
            class="stock-list__item-filter"
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
            class="stock-list__item-filter"
            :class="getSortActiveClassConstructor('VOLUME')">
            Объём
          </div>
        </template>
        <template #default="scope">
          <div v-if="scope.row.volume" class="stock-list__item-change"
          :class="{
            'stock-list__item-change_increased': scope.row.change > 0,
            'stock-list__item-change_decreased': scope.row.change < 0,
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
            class="stock-list__item-filter"
            :class="getSortActiveClassConstructor('NAME')">
            Объём / Кап.
          </div>
        </template>
        <template #default="scope">
          <div v-if="scope.row.cap && scope.row.volume" class="stock-list__item-change"
          :class="{
            'stock-list__item-change_increased': scope.row.change > 0,
            'stock-list__item-change_decreased': scope.row.change < 0,
          }">
            {{ scope.row.volumeToCap }}%
          </div>
          <template v-else>-</template>
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" placeholder="Что ищем?" />
        </template>
        <template #default="scope">
          <router-link :to="`/stocks/${scope.row.market}:${cleanTicker(scope.row.ticker)}`">
            Перейти к компании
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="tableData.length"
      background
      layout="prev, pager, next"
      @current-change="handleCurrentPageChange"
      :page-size="pageSize"
      v-model:currentPage="currentPage"
      :total="stocks.length" />
  </div>
</template>

<script>

const SORT_TYPES = ['NAME', 'PRICE', 'CHANGE', 'CAP', 'VOLUME', 'VOLUME_TO_CAP']
  .reduce((t, i) => ({ ...t, [i]: i }), {});

export default {
  name: 'StockList',
  props: {
    stocks: Array,
  },
  data() {
    return {
      search: '',
      currentPage: +this.$route.query.page || 1, // почему-то не работает ни в какую
      pageSize: 20,
      sortType: SORT_TYPES.CAP,
      sortStage: 1,
    };
  },
  methods: {
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
            b.changePercent - a.changePercent,
            a.changePercent - b.changePercent][this.sortStage - 1];
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
        ? `${new Intl.NumberFormat('ru-RU', { fraction: 2 }).format(cap.value)} ${cap.measure}`
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
        'stock-list__item-filter_active': sortType === this.sortType && this.sortStage,
        'stock-list__item-filter_up': sortType === this.sortType && this.sortStage === 1,
        'stock-list__item-filter_down': sortType === this.sortType && this.sortStage === 2,
      };
    },
  },
  computed: {
    tableData() {
      const stocks = [...this.stocks].sort(this.sortTable);
      return this.search
        ? stocks
          .filter((data) => (
            `${data.ticker}/${data.name}`
              .toLowerCase()
              .includes(this.search.toLowerCase())))
        : stocks
          .slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    },
  },
};
</script>

<style lang="scss">
  .stock-list {
    display: grid;
    grid-auto-flow: row;
    grid-gap: 16px;

    a {
      color: lightseagreen;
      text-decoration: none;
    }

    &__table {
      min-height: 450px;
      .cell {
        white-space: nowrap;
      }
    }

    &__item {

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

      &-logo {
        border: 1px solid #E8E8E8;
        width: 25px;
        height: 25px;
        border-radius: 25px;
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
