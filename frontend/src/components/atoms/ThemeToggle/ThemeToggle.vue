<template>
  <button
    class="theme-toggle"
    @click="toggleTheme"
    :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <Icon :name="theme === 'light' ? 'moon-fill' : 'sun-fill'" :size="18" />
  </button>
</template>

<script>
import Icon from '../Icon/Icon.vue'

export default {
  name: 'ThemeToggle',
  components: {
    Icon,
  },
  computed: {
    theme() {
      return this.$store.state.theme
    },
  },
  methods: {
    toggleTheme() {
      const newTheme = this.theme === 'light' ? 'dark' : 'light'
      this.$store.commit('setTheme', newTheme)
    },
  },
}
</script>

<style lang="scss" scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: var(--radius-md, 6px);
  background-color: transparent;
  color: var(--color-text-primary);
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);

  &:hover {
    background-color: var(--color-bg-hover);
  }

  &:active {
    background-color: var(--color-bg-active);
  }
}
</style>
