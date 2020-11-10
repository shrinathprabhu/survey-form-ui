<template>
  <div v-if="pageNotFound">
    <page-not-found />
  </div>
  <div v-else>
    <v-app>
      <v-main>
        <response-body :form="formDetails" />
      </v-main>
      <v-overlay v-if="dataLoading"> </v-overlay>
    </v-app>
  </div>
</template>

<style scoped src="@/assets/styles/light-background-color-fix.css"></style>

<script>
import PageNotFound from "./page-not-found.vue";
import store from "../store";
import ResponseBody from "../components/response-collector/response-body.vue";
export default {
  name: "form-preview",
  components: {
    PageNotFound,
    ResponseBody,
  },
  data: () => ({
    formDetails: {
      title: "Loading...",
    },
    dataLoading: false,
    pageNotFound: false,
  }),
  created: async function () {
    await this.fetchForm();
  },
  methods: {
    async fetchForm() {
      let response = await this.axios.get(
        process.env.VUE_APP_BASE_URL + "/forms/" + this.$route.params.id
      );
      if (response.data && response.data.data && response.data.data.isCreator) {
        this.formDetails = response.data.data;
        store.commit(
          "changeAppBarTitle",
          this.formDetails.title + " - Preview"
        );
        this.dataLoading = false;
      } else {
        this.dataLoading = false;
        this.pageNotFound = true;
      }
    },
  },
};
</script>