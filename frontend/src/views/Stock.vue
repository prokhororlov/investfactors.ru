<template>
  <div class="stock" v-if="ticker">
    <Info :ticker="ticker" class="stock__info" />
    <Chart :ticker="ticker" class="stock__chart" />
    <Metrics :ticker="ticker" class="stock__metrics" />
    <Profile :ticker="ticker" class="stock__profile" />
    <!-- <Editor /> -->
  </div>
</template>

<script>
import {
  Info,
  Chart,
  Profile,
  Metrics,
} from '../packages/TradingView';
// import { Editor } from '../components/molecules';

export default {
  name: 'Stock',
  components: {
    Info,
    Chart,
    Profile,
    Metrics,
    // Editor,
  },
  props: {
    ticker: String,
  },
};
</script>

<style lang="scss">
.stock {
  display: grid;
  padding: 16px;
  grid-template-areas:
    "info info info"
    "chart chart profile"
    "metrics metrics metrics";

  &__info { grid-area: info; }
  &__chart { grid-area: chart; }
  &__profile { grid-area: profile; }
  &__metrics { grid-area: metrics; }

  &__info {
    height: 171px!important;
  }

  @media (max-width: calc(768px + 35px)) {
    grid-template-areas:
      "info"
      "chart"
      "profile"
      "metrics";

    &__chart{
      height: 300px!important;
    }

    &__info {
      height: 248px!important;
    }
  }

  grid-gap: 16px;
}
</style>
