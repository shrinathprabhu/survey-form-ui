<template>
  <div v-if="pageNotFound">
    <PageNotFound />
  </div>
  <div v-else>
    <v-app>
      <AppBar />
      <v-main>
        <FormBody :formDetails="formDetails" />
        <!-- <QuestionComponent  /> -->
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import FormBody from "../components/EditForm/FormBody";
// import QuestionComponent from "../components/EditForm/QuestionComponent";
import PageNotFound from "./PageNotFound";
import store from "../store";
export default {
  name: "EditForm",
  components: {
    AppBar,
    FormBody,
    // QuestionComponent,
    PageNotFound,
  },
  data: () => ({
    formDetails: {},
    pageNotFound: false,
    dialog: false,
  }),
  created: async function () {
    window.addEventListener("popstate", this.handleBackButton);
    await this.fetchForm();
    // this.autoSave();
  },
  mounted: async function () {
    // window.addEventListener("hashchange", this.handleBackButton, false);
    // await this.fetchForm();
    this.autoSave();
  },
  beforeDestroy: function () {
    // window.removeEventListener("hashchange", this.handleBackButton);
  },
  methods: {
    autoSave() {
      setInterval(async () => {
        let formId = this.formDetails.id;
        let response = await this.axios.put(
          `${process.env.VUE_APP_BASE_URL}/forms/${formId}/save`,
          this.formDetails
        );
        if (response.data && response.data.data) {
          // Do nothing
        } else {
          this.pageNotFound = true;
        }
      }, 5000);
    },
    handleBackButton() {},
    async fetchForm() {
      let response = await this.axios.get(
        process.env.VUE_APP_BASE_URL + "/forms/" + this.$route.params.id
      );
      if (response.data && response.data.data && response.data.data.isCreator) {
        this.formDetails = response.data.data;
        store.commit("changeAppBarTitle", this.formDetails.title);
        store.commit("toggleEdit", true);
      } else {
        this.pageNotFound = true;
      }
    },
  },
  watch: {},
};
</script>