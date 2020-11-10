<template>
  <v-app>
    <app-bar page="dashboard" />
    <v-main>
      <dashboard-body />
    </v-main>
  </v-app>
</template>

<style scoped src="@/assets/styles/light-background-color-fix.css"></style>

<script>
import AppBar from "../components/app-bar.vue";
import DashboardBody from "../components/dashboard/dashboard-body.vue";
import ThemeMixin from "../mixins/theme-mixin";
import store from "../store";
export default {
  name: "home-page",
  components: {
    AppBar,
    DashboardBody,
  },
  mixins: [ThemeMixin],
  data: () => ({}),
  created: function () {
    window.document.title = "Openforms Dashboard";
    store.commit("changeAppBarTitle", window.document.title);
  },
  mounted: function () {
    window.document.title = "Openforms Dashboard";
    store.commit("changeAppBarTitle", window.document.title);
  },
  methods: {},
  computed: {},
};
</script>