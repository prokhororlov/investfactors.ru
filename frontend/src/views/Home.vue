<template>
  <div class="home">
    <el-input :class="{ticker}" style="grid-area: input"
      placeholder="Введите тикер" v-model="ticker" />
    <SingleTicker
      v-if="ticker"
      :style="{
        gridArea: 'result',
        height: '100px',
        width: '300px',
      }"
      :ticker="ticker.toUpperCase()"
    />
  </div>
</template>

<script>
import {
  SingleTicker,
} from '../packages/TradingView';

export default {
  name: 'Home',
  components: {
    SingleTicker,
  },
  data() {
    return {
      ticker: 'AAPL',
    };
  },
};
</script>

<style lang="scss">
.home {
  display: grid;
  grid-template-areas:
    "input input input"
    "result result result";
  justify-content: center;

  grid-gap: 16px;
  .el-input__inner {
    max-width: 300px;
    &[value=""]{
      text-transform: uppercase;
    }
  }
}
</style>
