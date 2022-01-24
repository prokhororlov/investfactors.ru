<template>
  <div class="stocks">
    <div style="dispal: flex">
      <el-button :disabled="market === 'RU'" @click="setMarket('RU')">РФ</el-button>
      <el-button :disabled="market === 'US'" @click="setMarket('US')">US</el-button>
    </div>
    <StockList :stocks="stocks" :isLoading="isLoading" :market="market" />
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
      market: this.$route.query.market || 'RU',
    };
  },
  methods: {
    setMarket(market) {
      this.market = market;
    },
    getStocks() {
      if (this.isPending) return;
      this.isPending = true;
      axios.post('/api/stocks', {
        page: this.$route.query.page,
        search: this.$route.query.search,
        sort_type: this.$route.query.sort_by,
        sort_stage: this.$route.query.sort_stage,
        market: this.$route.query.market,
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
