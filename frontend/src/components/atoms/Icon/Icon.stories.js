import Icon from './Icon.vue';

export default {
  title: 'Components/molecules/Icon',
  component: Icon,
  argTypes: {},
};

const Template = (args) => ({
  components: { Icon },
  setup() {
    return { args };
  },
  template: '<Icon v-bind="args" />',
});

export const Component = Template.bind({});
Component.args = {
  name: 'pencil',
  size: 16,
};
