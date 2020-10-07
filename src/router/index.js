import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage';
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
    path: '/forms/:id/preview',
    name: 'FormPreview',
    component: () => import(/* webpackChunkName: "form-preview" */ '../views/FormPreview.vue')
  },
  {
    path: '/404',
    name: 'PageNotFound',
    component: import(/* webpackChunkName: "page-not-found" */ '../views/PageNotFound.vue')
  },
  {
    path: '/500',
    name: 'SomethingWentWrong',
    component: import(/* webpackChunkName: "something-went-wrong" */ '../views/SomethingWentWrong.vue')
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
