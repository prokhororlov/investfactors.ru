<template>
  <div class="feature-card">
    <div class="feature-card__icon">
      <Icon :name="icon" :size="32" />
    </div>
    <h3 class="feature-card__title">{{ title }}</h3>
    <p class="feature-card__description">{{ description }}</p>
  </div>
</template>

<script>
import { Icon } from '../../atoms'

export default {
  name: 'FeatureCard',
  components: {
    Icon,
  },
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.feature-card {
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-align: center;
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 1);
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: var(--radius-full);
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
    color: white;
    margin-bottom: 16px;
    box-shadow: 0 4px 12px rgba(60, 94, 205, 0.3);
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    color: var(--color-text-primary);
    margin: 0 0 12px 0;
    line-height: 1.3;
  }

  &__description {
    font-size: 14px;
    color: var(--color-text-secondary);
    line-height: 1.5;
    margin: 0;
  }
}
</style>
