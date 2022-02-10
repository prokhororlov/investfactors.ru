<template>
  <div class="stocks">
    <div style="display: flex">
      <el-button
        v-for="(item) of ['MOEX', 'NASDAQ', 'NYSE']"
        :key="item"
        size="mini"
        :disabled="(this.market) === item || isLoading"
        @click="setMarket(item)">
        {{item}}
      </el-button>
    </div>
    <StockList :stocks="stocks" :isLoading="isLoading" />
  </div>
</template>

<script>
import StockList from '../components/organisms/StockList.vue';

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
      market: this.$route.query.market || 'MOEX',
    };
  },
  methods: {
    setMarket(market) {
      this.market = market;
      this.$router.push({
        path: '/stocks/',
        query: {
          ...this.$route.query,
          market,
          page: undefined,
        },
      });
    },
    getStocks() {
      if (this.isPending) return;
      this.isPending = true;
      this.$store.state.api.getStocks({ query: this.query })
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
      return {
        page: this.$route.query.page || 1,
        search: this.$route.query.search,
        sort_type: this.$route.query.sort_type,
        sort_stage: this.$route.query.sort_stage,
        market: this.market,
      };
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
