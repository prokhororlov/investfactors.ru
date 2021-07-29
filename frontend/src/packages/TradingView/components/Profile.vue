<template>
  <TradingViewShell
    v-if="ticker"
    frameUrl="https://s.tradingview.com/embed-widget/symbol-profile/"
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
  name: 'Profile',
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
        width: '100%',
        height: '100%',
        colorTheme: this.theme,
        isTransparent: false,
        largeChartUrl: `${window.location.origin}/openStock/`,
      };
    },
  },
};
</script>
