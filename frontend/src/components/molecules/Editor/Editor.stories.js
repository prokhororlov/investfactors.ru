import Editor from './Editor.vue';
import 'element-plus/lib/theme-chalk/index.css';

export default {
  title: 'Components/molecules/Editor',
  component: Editor,
  argTypes: {},
};

const Template = (args) => ({
  components: { Editor },
  setup() {
    return { args };
  },
  template: '<Editor v-bind="args" />',
});

export const Component = Template.bind({});
Component.args = {};
