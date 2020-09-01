<template>
  <v-app>
    <AppBar />

    <v-main>
      <AppBody />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar";
import AppBody from "../components/AppBody";
import ThemeMixin from "../mixins/ThemeMixin";
export default {
  name: "HomePage",
  components: {
    AppBar,
    AppBody,
  },
  mixins: [ThemeMixin],
  data: () => ({}),
  methods: {},
  computed: {},
};
</script>