import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Search from '@/views/Search.vue';
import Charts from '@/views/Charts.vue';
import Composite from '@/views/Composite.vue';
import History from '@/views/History.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/charts',
      name: 'charts',
      component: Charts
    },
    {
      path: '/composite',
      name: 'composite',
      component: Composite
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },

  ],
});
