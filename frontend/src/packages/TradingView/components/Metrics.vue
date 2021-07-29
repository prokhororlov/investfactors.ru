<template>
  <TradingViewShell
    v-if="ticker"
    frameUrl="https://s.tradingview.com/embed-widget/financials/"
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
  name: 'Metrics',
  props: unionProps,
  components: {
    TradingViewShell,
  },
  computed: {
    params() {
      return {
        locale: dateTimeOptions.locale,
        symbol: this.ticker,
      };
    },
    options() {
      return {
        colorTheme: this.theme,
        width: '100%',
        height: '100%',
        isTransparent: false,
        largeChartUrl: `${window.location.origin}/openStock/`,
        displayMode: 'regular',
      };
    },
  },
};
</script>
