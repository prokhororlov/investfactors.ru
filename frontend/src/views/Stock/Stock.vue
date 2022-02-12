<template>
  <div class="stock" v-if="ticker">
    <ShortOverview :ticker="ticker" class="stock__chart" :height="367" />
    <CompanyProfile :ticker="ticker" class="stock__profile" :height="367"/>
    <Metrics :ticker="ticker" class="stock__metrics" :height="386"/>
  </div>
</template>

<script>
import { Metrics } from '../../packages/TradingView';
import ShortOverview from '../../packages/BestStocks/ShortOverview.vue';
import CompanyProfile from './src/CompanyProfile.vue';
// import { Editor } from '../components/molecules';

export default {
  name: 'Stock',
  components: {
    ShortOverview,
    Metrics,
    CompanyProfile,
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
    "chart profile"
    "metrics metrics";
  grid-template-columns: 50%;

  // &__info { grid-area: info; }
  &__chart { grid-area: chart; }
  &__profile { grid-area: profile; }
  &__metrics { grid-area: metrics; }

  // &__info {
  //   height: 171px!important;
  // }

  @media (max-width: calc(768px + 35px)) {
    grid-template-areas:
      // "info"
      "chart"
      "profile"
      "metrics";
    grid-template-columns: 100%;

    // &__chart{
    //   height: 300px!important;
    // }

    // &__info {
    //   width: 100%;
    //   height: 248px!important;
    // }
  }

  grid-gap: 16px;
}
</style>
