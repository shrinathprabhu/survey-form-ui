<template>
  <v-app>
    <AppBar />
    <v-main>
      <FormBody />
      <QuestionComponent :formDetails="formDetails" />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar";
import FormBody from "../components/EditForm/FormBody";
import QuestionComponent from "../components/EditForm/QuestionComponent";
import store from "../store";
export default {
  name: "EditForm",
  components: {
    AppBar,
    FormBody,
    QuestionComponent,
  },
  data: () => ({
    formDetails: {},
  }),
  mounted: async function () {
    let response = await this.axios.get(
      "http://localhost:3000/forms/" + this.$route.params.id
    );
    if (response.data && response.data.data && response.data.data.isCreator) {
      this.formDetails = response.data.data;
      window.document.title = this.formDetails.title;
      store.commit("changeAppBarTitle", this.formDetails.title);
      store.commit("toggleEdit", true);
    } else {
      throw "Page not found";
    }
  },
};
</script>