<template>
  <div class="app-container">
    <Header />
    <div class="app__view">
      <Transition name="fade">
        <router-view/>
      </Transition>
    </div>
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
@import './assets/styles/themes.scss';

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-family);
  transition: background-color var(--transition-base), color var(--transition-base);
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg-secondary);
}
::-webkit-scrollbar-thumb {
  background: var(--color-accent);
  opacity: 0.8;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent-hover);
  opacity: 1;
}

.app-container {
  min-height: 100vh;
  background-color: var(--color-bg-primary);
}

#app {
  font-family: var(--font-family);
  text-align: center;
  color: var(--color-text-primary);
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
