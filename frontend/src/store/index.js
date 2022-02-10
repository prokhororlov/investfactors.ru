import { createStore } from 'vuex';
import { Storage } from './src/Storage';
import { API } from './src/API';

const storage = new Storage();
const api = new API(storage.get('token'));

console.log(api);

const store = createStore({
  state: {
    storage,
    api,
  },
  mutations: {
    setToken: (state, token) => {
      state.api.setToken(token);
      if (token) state.storage.set('token', token);
      else state.storage.remove('token');
    },
  },
  actions: {
  },
  getters: {
    token: (state) => (
      state.storage.get('token')
    ),
  },
  modules: {
  },
});

export default store;
