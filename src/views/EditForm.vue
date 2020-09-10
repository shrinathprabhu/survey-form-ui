<template>
  <div v-if="pageNotFound">
    <PageNotFound />
  </div>
  <div v-else>
    <v-app>
      <AppBar />
      <v-main>
        <FormBody />
        <QuestionComponent :formDetails="formDetails" />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import FormBody from "../components/EditForm/FormBody";
import QuestionComponent from "../components/EditForm/QuestionComponent";
import PageNotFound from "./PageNotFound";
import store from "../store";
import formStore from "../store/form";
export default {
  name: "EditForm",
  components: {
    AppBar,
    FormBody,
    QuestionComponent,
    PageNotFound,
  },
  data: () => ({
    formDetails: {},
    pageNotFound: false,
  }),
  mounted: async function () {
    let response = await this.axios.get(
      process.env.VUE_APP_BASE_URL + "/forms/" + this.$route.params.id
    );
    if (response.data && response.data.data && response.data.data.isCreator) {
      this.formDetails = response.data.data;
      // window.document.title = this.formDetails.title;
      // store.commit("changeAppBarTitle", this.formDetails.title);
      store.commit("toggleEdit", true);
      formStore.commit("updateForm", this.formDetails);
    } else {
      this.pageNotFound = true;
    }
    this.autoSave();
  },
  methods: {
    autoSave() {
      // setInterval(() => {
      //   console.log("Saving...", formStore.state.form);
      // }, 2500);
    },
  },
};
</script>