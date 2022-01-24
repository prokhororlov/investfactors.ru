<template>
  <div class="stocks">
    <StockList :stocks="stocks" :page="page" :isLoading="isLoading" />
  </div>
</template>

<script>
import StockList from '../components/organisms/StockList.vue';

const axios = require('axios');

export default {
  name: 'Stocks',
  props: {
    page: Number,
  },
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
    getStocks() {
      if (this.isPending) return;
      this.isPending = true;
      axios.post('/api/stocks')
        .then((response) => {
          this.stocks = [...Object.values(response.data)];
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
};
</script>

<style lang="scss">
.stocks {
  padding: 16px;
  box-sizing: border-box;
}
</style>
