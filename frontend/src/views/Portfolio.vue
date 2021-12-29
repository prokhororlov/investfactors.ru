<template>
  <div class="portfolio">
    <Info
      v-for="item of portfolio"
      :key="item"
      :ticker="item"
      :height="228"
      class="portfolio__info"
    />
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
  padding: 16px;

  @media(max-width: 992px) {
    grid-template-columns: 100%;
  }
}
</style>
