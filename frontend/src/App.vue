<template>
  <Header />
  <div class="app__view">
    <Transition name="fade">
      <router-view/>
    </Transition>
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
::-webkit-scrollbar             { width: 4px; height: 4px; }
::-webkit-scrollbar-track       { background: rgba(230, 230, 230, 1); }
::-webkit-scrollbar-thumb       { background: rgba(0, 201, 255, 0.8); }
::-webkit-scrollbar-thumb:hover { background: rgba(0, 201, 255, 1); }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
