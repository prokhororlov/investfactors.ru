<template>
  <div class="portfolio">
    <Info v-for="item of portfolio" :key="item" :ticker="item" height="230" />
  </div>
</template>

<script>
import {
  Info,
} from '../packages/TradingView';

export default {
  name: 'Portfolio',
  components: {
    Info,
  },
  computed: {
    portfolio() {
      return new URLSearchParams(window.location.search)
        .get('tickers')
        .split(' ');
    },
  },
};
</script>

<style lang="scss">
.portfolio {
  display: grid;
  grid-template-columns: 50% 50%;
  justify-content: center;
  grid-gap: 16px;
}
</style>
