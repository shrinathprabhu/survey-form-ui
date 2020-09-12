import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage';
import PageNotFound from '../views/PageNotFound';
import SomethingWentWrong from '../views/SomethingWentWrong';
import store from '../store';

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
  },
  {
    path: '/404',
    name: 'PageNotFound',
    component: PageNotFound
  },
  {
    path: '/500',
    name: 'SomethingWentWrong',
    component: SomethingWentWrong
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.commit("toggleEdit", false);
  next();
});

export default router;
