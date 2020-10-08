<template>
  <v-app>
    <AppBar />
    <v-main>
      <AppBody />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar.vue";
import AppBody from "../components/AppBody.vue";
import ThemeMixin from "../mixins/ThemeMixin";
import store from "../store";
export default {
  name: "HomePage",
  components: {
    AppBar,
    AppBody,
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