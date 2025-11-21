import ElementPlus from 'element-plus';
import VueYandexMetrika from 'vue-yandex-metrika';
import 'element-plus/lib/theme-chalk/index.css';
import './assets/styles/variables.scss';

import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

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
