<template>
  <div class="stock-list">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column width="70">
        <template #default="scope">
          {{ search ? scope.$index + 1 : getAbsoluteIndex(scope.$index) + 1 }}
        </template>
      </el-table-column>
      <el-table-column width="70">
        <template #default="scope">
          <div
            class="stock-list__item-logo"
            :style="`background: url(https://yastatic.net/s3/fintech-icons/1/i/${cleanTicker(scope.row.ticker)}.svg), #F3F3F3;`"
          />
        </template>
      </el-table-column>
      <el-table-column label="Тикер" width="70">
        <template #default="scope">
          {{ cleanTicker(scope.row.ticker) }}
        </template>
      </el-table-column>
      <el-table-column label="Название компании" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" placeholder="Что ищем?" />
        </template>
        <template #default="scope">
          <router-link :to="`/stocks/${cleanTicker(scope.row.ticker)}`">
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
    };
  },
  methods: {
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
      return this.search
        ? this.stocks.filter((data) => (
          `${data.ticker}/${data.name}`
            .toLowerCase()
            .includes(this.search.toLowerCase())))
        : this.stocks
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

    &__item {

      &-logo {
        border: 1px solid #E8E8E8;
        width: 25px;
        height: 25px;
        border-radius: 25px;
      }
    }
  }
</style>
