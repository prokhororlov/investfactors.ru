<template>
  <Header />
  <div class="app__view">
    <router-view/>
  </div>
</template>

<script>
import Header from './components/organisms/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

  .app__view {
    padding: 16px;
  }
}

</style>
