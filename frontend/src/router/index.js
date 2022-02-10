import { createRouter, createWebHistory } from 'vue-router';
import {
  Home,
  Stocks,
  Stock,
  Profile,
} from '../views';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks,
  },
  {
    path: '/stocks/:ticker',
    name: 'Stock',
    props: true,
    component: Stock,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/openStock',
    redirect: (to) => ({
      path: `/stocks/${to.query.tvwidgetsymbol}`,
      query: {},
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
