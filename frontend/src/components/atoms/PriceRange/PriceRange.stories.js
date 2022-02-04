import PriceRange from './PriceRange.vue';

export default {
  title: 'components/molecules/PriceRange',
  component: PriceRange,
  argTypes: {},
};

const Template = (args) => ({
  components: { PriceRange },
  setup() {
    return { args };
  },
  template: '<PriceRange v-bind="args" />',
});

export const Component = Template.bind({});
Component.args = {
  min: 525.57,
  max: 1281.92,
  current: 814.24,
};
