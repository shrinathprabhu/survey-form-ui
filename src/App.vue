<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:300,400,400i,500,700&subset=latin,vietnamese,latin-ext,cyrillic,greek,cyrillic-ext,greek-ext");

html,
body {
  font-family: "Google Sans", sans-serif;
}

#app {
  font-family: "Google Sans", sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<script>
export default {
  name: "App",
  components: {},
  mixins: [],
  data: () => ({}),
  methods: {},
  computed: {},
  mounted: function () {
    // console.log(process.env);
  },
};
</script>