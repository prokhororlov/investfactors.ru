import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app');
