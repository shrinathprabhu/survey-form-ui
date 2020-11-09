<template>
  <v-container fluid>
    <v-col class="custom-container">
      <v-row class="justify-center">
        <v-card
          shaped
          class="form-card"
          to="/forms/create"
          elevation="5"
          outlined
        >
          <v-row align="center" justify="center" style="height: 205px">
            <v-col>
              <v-row align="center" justify="center">
                <v-icon style="font-size: 80px" :color="themeColor"
                  >mdi-plus</v-icon
                >
              </v-row>
              <v-row align="center" justify="center" class="mt-2"
                >Create new form</v-row
              >
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
          <v-row align="center" justify="center" style="height: 205px">
            <v-col>
              <v-row align="center" justify="center">
                <v-icon style="font-size: 80px" :color="themeColor"
                  >mdi-pencil-box-outline</v-icon
                >
              </v-row>
              <v-row align="center" justify="center" class="mt-2">{{
                form.title
              }}</v-row>
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
.custom-container {
  padding-top: 20px;
  padding-left: 60px;
  padding-right: 60px;
}
@media only screen and (max-width: 600px) {
  .form-card {
    margin: 20px 0px 20px 30px;
    width: 150px;
    height: 205px;
    cursor: pointer;
  }
  .custom-container {
    padding-top: 20px;
    padding-left: 0px;
    padding-right: 0px;
  }
} ;
</style>

<script>
import ThemeMixin from "../../mixins/theme-mixin";
import DB from "../../utils/db";
export default {
  name: "dashboard-body",
  mixins: [ThemeMixin],
  data: () => ({
    forms: [],
  }),
  mounted: async function () {
    let localForms = await DB.fetchForms();
    this.forms = localForms || [];
    let remoteForms = await this.fetchForms();
    await DB.saveForms(remoteForms.list);
    this.forms = [...remoteForms.list];
  },
  methods: {
    async fetchForms() {
      let response = await this.axios.get(
        process.env.VUE_APP_BASE_URL + "/forms"
      );
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