import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/dashboard.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/forms",
  },
  {
    path: "/forms",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/forms/create",
    name: "CreateForm",
    component: () =>
      import(/* webpackChunkName: "create-form" */ "../views/create-form.vue"),
  },
  {
    path: "/forms/:id/edit",
    name: "EditForm",
    component: () =>
      import(/* webpackChunkName: "edit-form" */ "../views/edit-form.vue"),
  },
  {
    path: "/forms/:id/preview",
    name: "FormPreview",
    component: () =>
      import(
        /* webpackChunkName: "form-preview" */ "../views/form-preview.vue"
      ),
  },
  {
    path: "/404",
    name: "PageNotFound",
    component: import(
      /* webpackChunkName: "page-not-found" */ "../views/page-not-found.vue"
    ),
  },
  {
    path: "/500",
    name: "SomethingWentWrong",
    component: import(
      /* webpackChunkName: "something-went-wrong" */ "../views/something-went-wrong.vue"
    ),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("toggleEdit", false);
  next();
});

export default router;
