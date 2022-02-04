<template>
  <div class="price-range__wrapper">
    <div class="price-range">
      <div class="price-range__price">{{ min }}</div>
      <div
        class="price-range__price"
        :style="{
          left: `${currentPercent}%`,
        }">
          <!-- {{ current }} -->
        </div>
      <div class="price-range__price">{{ max }}</div>
    </div>
  </div>
</template>

<script>
import './PriceRange.scss';

export default {
  props: {
    min: Number,
    max: Number,
    current: Number,
  },
  computed: {
    currentPercent() {
      return ((this.current - this.min) / (this.max - this.min)) * 100;
    },
  },
};
</script>
