<template>
  <v-app>
    <AppBar />
    <v-main>
      <FormBody />
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar";
import FormBody from "../components/FormBody";
import store from "../store";
export default {
  name: "EditForm",
  components: {
    AppBar,
    FormBody,
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