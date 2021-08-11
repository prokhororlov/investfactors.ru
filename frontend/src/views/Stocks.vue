<template>
  <StockList :stocks="stocks" :page="page" />
</template>

<script>
import StockList from '../components/organisms/StockList.vue';

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
      stocks: this.$store.state.stocks,
    };
  },
};
</script>

<style lang="scss">
</style>
