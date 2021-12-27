import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { createApp } from 'vue';

import VueAuth0Plugin from 'vue-auth0-plugin';
import authConfig from '../auth_config.json';

import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(ElementPlus)
  .use(VueAuth0Plugin, authConfig)
  .use(store)
  .use(router)
  .mount('#app');
