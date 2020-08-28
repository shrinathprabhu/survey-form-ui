<template>
  <v-container fluid>
    <v-col style="padding-top: 60px; padding-left: 60px; padding-right: 60px;">
      <v-row>
        <v-card shaped class="form-card">
          <v-row align="center" justify="center" style="height: 205px;">
            <v-col>
              <v-row align="center" justify="center">
                <v-icon style="font-size:80px" :color="themeColor">mdi-plus</v-icon>
              </v-row>
              <v-row align="center" justify="center" class="mt-2">Create new form</v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card v-for="item in items" :key="item" shaped class="form-card">Create New Form</v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<style scoped>
.form-card {
  margin: 25px;
  width: 185px;
  height: 205px;
  cursor: pointer;
}
</style>

<script>
import store from "../store";
export default {
  name: "AppBody",

  data: () => ({
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  }),
  computed: {
    themeColor: () => {
      console.log(store.state);
      return store.state.theme.value;
    },
  },
};
</script>