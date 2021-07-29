<template>
  <StockList :stocks="stocks" :page="page" />
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
      stocks: [],
    };
  },
  mounted() {
    axios.post('/api/stocks')
      .then((response) => {
        this.stocks = response.data;
      });
  },
};
</script>

<style lang="scss">
</style>
