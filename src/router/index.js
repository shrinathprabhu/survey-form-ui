import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/forms'
  },
  {
    path: '/forms',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/forms/create',
    name: 'CreateForm',
    component: () => import(/* webpackChunkName: "create-form" */ '../views/CreateForm.vue')
  },
  {
    path: '/forms/:id/edit',
    name: 'EditForm',
    component: () => import(/* webpackChunkName: "edit-form" */ '../views/EditForm.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
