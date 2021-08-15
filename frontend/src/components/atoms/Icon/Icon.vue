<template>
  <i
    class="icon bi"
    :class="{
      [`bi-${name}`]: name,
    }"
    :style="{
      fontSize: `${size}px`,
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotate}deg)`,
    }" />
</template>

<script>
import 'bootstrap-icons/font/bootstrap-icons.css';

export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 16,
    },
    rotate: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style>
.icon {
  display: flex;
}
</style>
