<template>
  <div class="stock-list">
    <el-table
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
            class="stock-list__item-filter">
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
            class="stock-list__item-filter">
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
            class="stock-list__item-filter">
            Изменение
          </div>
        </template>
        <template #default="scope">
          <div class="stock-list__item-change"
          :class="{
            'stock-list__item-change_increased': scope.row.change > 0,
            'stock-list__item-change_decreased': scope.row.change < 0,
          }">
            <span>{{ scope.row.changePercent }}%</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('CAP')"
            class="stock-list__item-filter">
            Рын. кап.
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
            class="stock-list__item-filter">
            Объём
          </div>
        </template>
        <template #default="scope">
          {{ formatCap(scope.row.volume) }}
        </template>
      </el-table-column>

      <el-table-column>
        <template #header>
          <div
            @click="setSortType('VOLUME_TO_CAP')"
            class="stock-list__item-filter">
            Объём / Рын. кап.
          </div>
        </template>
        <template #default="scope">
          {{ scope.row.volumeToCap }}%
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
      currentPage: this.$route.query.page || 1, // почему-то не работает ни в какую
      pageSize: 20,
      sortType: SORT_TYPES.CAP,
      sortStage: 0,
    };
  },
  methods: {
    sortTable(a, b) {
      switch (this.sortType) {
        case SORT_TYPES.PRICE:
          return [
            b.price - a.price,
            a.price - b.price][this.sortStage];
        case SORT_TYPES.VOLUME: {
          const aVol = a.volume || 0;
          const bVol = b.volume || 0;
          return [
            bVol - aVol,
            aVol - bVol][this.sortStage];
        }
        case SORT_TYPES.VOLUME_TO_CAP:
          return [
            b.volumeToCap - a.volumeToCap,
            a.volumeToCap - b.volumeToCap][this.sortStage];
        case SORT_TYPES.CHANGE:
          return [
            b.changePercent - a.changePercent,
            a.changePercent - b.changePercent][this.sortStage];
        case SORT_TYPES.CAP: {
          const aCap = a.cap || 0;
          const bCap = b.cap || 0;
          return [
            bCap - aCap,
            aCap - bCap][this.sortStage];
        }
        case SORT_TYPES.NAME:
        default:
          return [
            a.name.localeCompare(b.name),
            b.name.localeCompare(a.name)][this.sortStage];
      }
    },
    setSortType(type) {
      if (this.sortStage || this.sortType !== type) {
        this.sortStage = 0;
      } else {
        this.sortStage += 1;
      }

      this.sortType = SORT_TYPES[type];
      this.currentPage = 1;
      this.handleCurrentPageChange(1);
    },
    formatCap(value) {
      let cap = { value: value / 1000000, measure: 'M' };
      if (cap.value / 1000 > 1) cap = { value: cap.value / 1000, measure: 'B' };
      if (cap.value / 1000 > 1) cap = { value: cap.value / 1000, measure: 'T' };

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
      .cell {
        white-space: nowrap;
      }
    }

    &__item {

      &-filter {
        cursor: pointer;
        transition: 0.3s;
        &:hover {
          color: lightseagreen;
        }
      }

      &-logo {
        border: 1px solid #E8E8E8;
        width: 25px;
        height: 25px;
        border-radius: 25px;
      }

      &-change {
        color: #A8A8A8;
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
