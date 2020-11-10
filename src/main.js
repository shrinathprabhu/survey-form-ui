import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "./plugins/axios";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import store from "./store";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";

Vue.config.productionTip = false;

Sentry.init({
  dsn: process.env.VUE_APP_SENTRY_DSN,
  integrations: [
    new Integrations.BrowserTracing(),
    new VueIntegration({
      Vue,
      tracing: true,
      logErrors: true,
    }),
  ],
  tracesSampleRate: 0.8,
});

new Vue({
  router,
  vuetify,
  axios,
  store,
  render: (h) => h(App),
}).$mount("#app");
