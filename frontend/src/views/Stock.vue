<template>
  <div class="stock">
    <Chart class="stock__chart" v-if="ticker" style="grid-area: chart" :ticker="ticker" />
    <Profile v-if="ticker" style="grid-area: profile" :ticker="ticker" />
    <Metrics v-if="ticker" style="grid-area: metrics" :ticker="ticker" />
  </div>
</template>

<script>
import {
  Chart,
  Profile,
  Metrics,
} from '../packages/TradingView';

export default {
  name: 'Stock',
  components: {
    Chart,
    Profile,
    Metrics,
  },
  props: {
    ticker: String,
  },
};
</script>

<style lang="scss">
.stock {
  display: grid;
  grid-template-areas:
    "chart chart metrics"
    "profile profile profile";

  @media (max-width: 768px) {
    grid-template-areas:
      "chart"
      "profile"
      "metrics";

    &__chart{
      height: 300px!important;
    }
  }
  grid-gap: 16px;
}
</style>
