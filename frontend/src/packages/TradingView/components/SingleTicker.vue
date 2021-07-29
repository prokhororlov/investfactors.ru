<template>
  <TradingViewShell
    v-if="ticker"
    frameUrl="https://s.tradingview.com/embed-widget/single-quote/"
    :width="width"
    :height="height"
    :params="params"
    :options="options"
  />
</template>

<script>
import TradingViewShell from '../shell/TradingViewShell.vue';
import unionProps from '../helpers/unionProps';
import dateTimeOptions from '../helpers/dateTimeOptions';

export default {
  name: 'SingleTicker',
  props: unionProps,
  components: {
    TradingViewShell,
  },
  computed: {
    params() {
      return {
        symbol: this.ticker,
        colorTheme: this.theme,
        isTransparent: false,
        locale: dateTimeOptions.locale,
        largeChartUrl: `${window.location.origin}/openStock/`,
      };
    },
  },
};
</script>
