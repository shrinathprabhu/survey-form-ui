<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-col justify="center" align="center">
          <v-row justify="center" align="center" class="mt-3 pt-3">
            <h1 :color="themeColor">Error 500: Something went wrong</h1>
          </v-row>
          <v-row justify="center" align="center" class="mt-3 pt-3">
            Maybe this is an internal server issue or maybe you're trying to
            access invalid or inaccessible pages
          </v-row>
          <v-btn to="/forms" :color="themeColor" tile dark class="mt-5">
            Go to Dashboard
          </v-btn>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
  <!-- <vue-qrcode value="https://openforms.herokuapp.com" width="640" /> -->
</template>

<script>
import ThemeMixin from "../mixins/theme-mixin";
import VueQrcode from "vue-qrcode";
export default {
  name: "something-went-wrong",
  mixins: [ThemeMixin],
  components: {
    VueQrcode,
  },
  mounted() {
    document.title = "Error 500 - Something went wrong";
  },
  data: () => ({}),
  methods: {},
};
</script>