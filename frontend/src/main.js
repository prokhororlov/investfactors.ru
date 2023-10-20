import ElementPlus from 'element-plus';
import VueYandexMetrika from 'vue-yandex-metrika';
import 'element-plus/lib/theme-chalk/index.css';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

createApp(App)
  .use(ElementPlus)
  .use(store)
  .use(router)
  .use(VueYandexMetrika, {
    id: 88216239,
    router,
    env: process.env.NODE_ENV,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    trackHash: true,
  })
  .mount('#app');
