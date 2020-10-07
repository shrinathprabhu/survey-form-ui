<template>
  <keep-alive>
    <v-app>
      <v-main>
        <v-container fill-height>
          <v-col justify="center" align="center">
            <v-row justify="center" align="center" class="mt-3 pt-3">
              <h1 :color="themeColor">Error 500: Something went wrong</h1>
            </v-row>
            <v-row justify="center" align="center" class="mt-3 pt-3"
              >Maybe this is an internal server issue or maybe you're trying to
              access invalid or inaccessible pages</v-row
            >
          </v-col>
        </v-container>
      </v-main>
    </v-app>
  </keep-alive>
</template>

<script>
import ThemeMixin from "../mixins/ThemeMixin";
export default {
  name: "SomethingWentWrong",
  mixins: [ThemeMixin],
  data: () => ({}),
  methods: {},
};
</script>