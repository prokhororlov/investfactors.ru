<template>
  <div class="stocks">
    <div style="display: flex">
      <el-button
        v-for="(item) of ['MOEX', 'NASDAQ', 'NYSE']"
        :key="item"
        size="mini"
        :disabled="(this.$route.query.market || 'MOEX') === item"
        @click="setMarket(item)">
        {{item}}
      </el-button>
    </div>
    <StockList :stocks="stocks" :isLoading="isLoading" />
  </div>
</template>

<script>
import StockList from '../components/organisms/StockList.vue';

const axios = require('axios');

export default {
  name: 'Stocks',
  components: {
    StockList,
  },
  data() {
    return {
      isLoading: true,
      isPending: false,
      stocks: [],
      interval: null,
    };
  },
  methods: {
    setMarket(market) {
      this.$router.push({
        path: '/stocks/',
        query: {
          ...this.$route.query,
          market,
        },
      });
    },
    getStocks() {
      if (this.isPending) return;
      this.isPending = true;
      axios.post('/api/stocks', {
        page: this.$route.query.page || 1,
        search: this.$route.query.search,
        sort_type: this.$route.query.sort_by,
        sort_stage: this.$route.query.sort_stage,
        market: this.$route.query.market || 'MOEX',
      })
        .then((response) => {
          this.stocks = response.data;
        })
        .finally(() => {
          this.isLoading = false;
          this.isPending = false;
        });
    },
  },
  mounted() {
    this.getStocks();
    this.interval = setInterval(this.getStocks, 1000 * 10);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  computed: {
    query() {
      return this.$route.query;
    },
  },
  watch: {
    query() {
      this.isLoading = true;
      this.getStocks();
    },
  },
};
</script>

<style lang="scss">
.stocks {
  padding: 16px;
  box-sizing: border-box;
}
</style>
