<template>
  <div class="stock" v-if="ticker">
    <Info :ticker="ticker" style="grid-area: info" class="stock__info" />
    <Chart :ticker="ticker" style="grid-area: chart" class="stock__chart" />
    <Profile :ticker="ticker" style="grid-area: profile" class="stock__profile" />
    <Metrics :ticker="ticker" style="grid-area: metrics" class="stock__metrics" />
  </div>
</template>

<script>
import {
  Info,
  Chart,
  Profile,
  Metrics,
} from '../packages/TradingView';

export default {
  name: 'Stock',
  components: {
    Info,
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
    "info info info"
    "chart chart metrics"
    "profile profile profile";

  &__info {
    height: 173px!important;
  }

  @media (max-width: 768px) {
    grid-template-areas:
      "info"
      "chart"
      "profile"
      "metrics";

    &__chart{
      height: 300px!important;
    }

    &__info {
      height: 228px!important;
    }
  }

  grid-gap: 16px;
}
</style>
