<template>
  <transition name="fade">
    <router-view></router-view>
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
  beforeCreate() {
    if (!/localhost:|192.168.[0-255].[0-255]:/.test(window.location.host)) {
      if (window.location.protocol === "http:") {
        window.location.replace("https://" + window.location.host);
      }
    }
  },
  mounted() {
    window.addEventListener("offline", function () {
      this.offline = true;
    });
  },
  watch: {},
};
</script>