<template>
  <transition name="fade">
    <keep-alive>
      <router-view></router-view>
      <v-snackbar v-model="offline">
        Seems like you're currently offline. Check network
      </v-snackbar>
    </keep-alive>
  </transition>
</template>

<style scoped>
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
  data: () => ({
    offline: false,
  }),
  methods: {},
  computed: {},
  mounted: function () {
    window.addEventListener("offline", function () {
      this.offline = true;
    });
  },
  watch: {},
};
</script>