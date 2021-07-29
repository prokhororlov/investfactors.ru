<template>
  <TradingViewShell
    v-if="ticker"
    frameUrl="https://www.tradingview.com/mediumwidgetembed/"
    :width="width"
    :height="height"
    :params="{
      locale: dateTimeOptions.locale,
      symbols: this.ticker,
      trendLineColor: '#2962ff',
      underLineBottomColor: 'rgba(41, 98, 255, 0)',
      underLineColor: 'rgba(41, 98, 255, 0.3)',
      fontColor: '#787b86',
      gridLineColor: 'rgba(42 ,46, 57, 0)',
      width: '100%',
      height: '100%',
      colorTheme: this.theme,
      isTransparent: false,
    }"
  />
</template>

<script>
import TradingViewShell from '../shell/TradingViewShell.vue';
import unionProps from '../helpers/unionProps';
import dateTimeOptions from '../helpers/dateTimeOptions';

export default {
  name: 'Overview',
  props: unionProps,
  components: {
    TradingViewShell,
  },
  data() {
    return {
      dateTimeOptions,
    };
  },
};
</script>
