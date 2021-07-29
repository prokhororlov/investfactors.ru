export default {
  width: [String, Number],
  height: [String, Number],
  ticker: { type: String, default: '', required: true },
  theme: {
    type: String,
    default: 'light',
    validator(value) {
      return ['dark', 'light'].includes(value);
    },
  },
};
