import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/Home.vue'),
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: () => import('../views/Stocks.vue'),
  },
  {
    path: '/stocks/:ticker',
    name: 'Stock',
    props: true,
    component: () => import('../views/Stock/Stock.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
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
