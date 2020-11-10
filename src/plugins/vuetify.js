import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark:
      typeof localStorage.getItem("prefs") === "string"
        ? JSON.parse(localStorage.getItem("prefs")).dark
        : false,
    themes: {
      light: {},
    },
  },
});
