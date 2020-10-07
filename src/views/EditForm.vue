<template>
  <div v-if="pageNotFound">
    <PageNotFound />
  </div>
  <div v-else>
    <v-app>
      <AppBar
        @save="saveForm('click')"
        @publish="publishForm"
        @preview="preview"
      />
      <v-main>
        <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
          top
          rounded="pill"
          transition="v-fade-transition"
        >
          <div class="text-center">{{ snackbarText }}</div>
        </v-snackbar>
        <FormBody
          :formDetails="formDetails"
          @auto-save-state-change="autoSave()"
        />
        <!-- <QuestionComponent  /> -->
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import FormBody from "../components/EditForm/FormBody";
// import QuestionComponent from "../components/EditForm/QuestionComponent";
import { debounce } from "lodash";
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
    snackbar: false,
    timeout: -1,
    snackbarText: "",
  }),
  created: async function () {
    await this.fetchForm();
  },
  mounted: async function () {},
  beforeDestroy: function () {
    this.saveForm("auto");
  },
  methods: {
    autoSave: debounce(function () {
      this.saveForm("auto");
    }, 5000),
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
    async saveForm(type) {
      this.snackbarText =
        type === "click"
          ? "Saving the form state..."
          : "Auto-saving the form state...";
      this.snackbar = true;
      this.timeout = 15000;
      let formId = this.formDetails.id;
      let response = await this.axios.put(
        `${process.env.VUE_APP_BASE_URL}/forms/${formId}/save`,
        this.formDetails
      );
      if (response.data && response.data.data) {
        this.snackbarText = "Form state saved";
      } else {
        this.snackbarText = "Failed to save the form state";
      }
      this.timeout = 2000;
    },
    async publishForm() {
      this.snackbarText = "Publishing form to the web...";
      this.snackbar = true;
      this.timeout = 15000;
      setTimeout(() => {
        this.snackbarText = "Form published";
        this.timeout = 2000;
      }, 2000);
      console.log("Form details", this.formDetails);
    },
    preview() {},
  },
  watch: {},
};
</script>