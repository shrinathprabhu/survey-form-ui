<template>
  <keep-alive>
    <v-app>
      <AppBar />
      <v-main>
        <AppBody />
      </v-main>
    </v-app>
  </keep-alive>
</template>

<script>
import AppBar from "../components/AppBar";
import AppBody from "../components/AppBody";
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