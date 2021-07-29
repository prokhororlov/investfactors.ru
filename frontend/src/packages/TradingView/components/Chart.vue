<template>
  <TradingViewShell
    v-if="ticker"
    frameUrl="https://www.tradingview.com/widgetembed/"
    :width="width"
    :height="height"
    :params="{
      symbol: ticker,
      theme: theme,
      interval: 'D',
      toolbarbg: ({ light: '#f1f3f6' })[theme],
      withdateranges: 1,
      hidesidetoolbar: 0,
      timezone: dateTimeOptions.timeZone,
      locale: dateTimeOptions.locale,
    }"
  />
</template>

<script>
import TradingViewShell from '../shell/TradingViewShell.vue';
import unionProps from '../helpers/unionProps';
import dateTimeOptions from '../helpers/dateTimeOptions';

export default {
  name: 'Chart',
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
