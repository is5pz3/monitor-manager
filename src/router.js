import Vue from 'vue';
import Router from 'vue-router';
import store from './store'
import Dashboard from '@/views/Dashboard.vue';
import Search from '@/views/Search.vue';
import Charts from '@/views/Charts.vue';
import Composite from '@/views/Composite.vue';
import History from '@/views/History.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

Vue.use(Router);

let router = new Router({
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
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    // otherwise redirect to home
    { path: '*', redirect: '/' }

  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
 const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters.isLoggedIn;
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router