<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-col justify="center" align="center">
          <v-row justify="center" align="center" class="mt-3 pt-3">
            <h1 :color="themeColor">Error 404: Page not found</h1>
          </v-row>
          <v-row justify="center" align="center" class="mt-3 pt-3"
            >Oops. Seems like the page you're trying to access does not
            exist</v-row
          >
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ThemeMixin from "../mixins/theme-mixin";
export default {
  name: "page-not-found",
  mixins: [ThemeMixin],
  data: () => ({}),
  methods: {},
};
</script>