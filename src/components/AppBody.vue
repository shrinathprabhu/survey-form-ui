<template>
  <v-container fluid>
    <v-col style="padding-top: 60px; padding-left: 60px; padding-right: 60px;">
      <v-row>
        <v-card shaped class="form-card" to="/forms/create" elevation="5">
          <v-row align="center" justify="center" style="height: 205px;">
            <v-col>
              <v-row align="center" justify="center">
                <v-icon style="font-size:80px" :color="themeColor">mdi-plus</v-icon>
              </v-row>
              <v-row align="center" justify="center" class="mt-2">Create new form</v-row>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          v-for="form in forms"
          :key="form.id"
          shaped
          class="form-card"
          :to="'/forms/' + form.id + '/edit'"
          elevation="5"
        >
          <v-row align="center" justify="center" style="height: 205px;">
            <v-col>
              <v-row align="center" justify="center">
                <v-icon style="font-size:80px" :color="themeColor">mdi-plus</v-icon>
              </v-row>
              <v-row align="center" justify="center" class="mt-2">{{form.title}}</v-row>
            </v-col>
          </v-row>
        </v-card>
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
import ThemeMixin from "../mixins/ThemeMixin";
export default {
  name: "AppBody",
  mixins: [ThemeMixin],
  data: () => ({
    forms: [],
  }),
  mounted: async function () {
    let forms = await this.fetchForms();
    console.log(forms);
    this.forms = [...this.forms, ...forms.list];
  },
  methods: {
    async fetchForms() {
      let response = await this.axios.get("http://localhost:3000/forms");
      if (response.status === 200) {
        if (response.data && response.data.code === 200) {
          return response.data.data;
        }
      } else throw alert("Error");
    },
  },

  computed: {},
};
</script>