<template>
  <iframe
    data-bs-widget
    :id="`${tickerFormated}-frame-6219160886`"
    :title="`${tickerFormated.toUpperCase()} Frame`"
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    scrolling="no"
    :style="{
      width: '100%',
      height: '384px',
      border: '1px solid #e0e3eb',
      borderRadius: '3px',
    }"
    :src="`https://beststocks.ru/widget/${tickerFormated}/analysts?id=${tickerFormated}-frame-6219160886`"
  ></iframe>
</template>

<script>
export default {
  name: 'ShortOverview',
  props: {
    ticker: String,
  },
  computed: {
    tickerFormated() {
      const [market, name] = this.ticker.split(':');
      return (market === 'MOEX' ? 'ru:' : '') + name.toLowerCase();
    },
  },
};
</script>
