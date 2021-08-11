import { createStore } from 'vuex';
import axios from 'axios';

const state = {
  stocks: [],
};

export default createStore({
  state,
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});

let isPending = false;

setInterval(() => {
  if (!isPending) {
    isPending = true;
    axios.post('/api/stocks')
      .then((response) => {
        state.stocks = response.data;
      })
      .finally(() => {
        isPending = false;
      });
  }
}, 1000 * 5);
