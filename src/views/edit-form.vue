<template>
  <div v-if="pageNotFound">
    <page-not-found />
  </div>
  <div v-else>
    <v-app>
      <app-bar
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
        <form-body
          :formDetails="formDetails"
          @auto-save-state-change="autoSave()"
        />
        <!-- <QuestionComponent  /> -->
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { debounce, isEqual as arePropertiesSame } from "lodash";
import AppBar from "../components/app-bar.vue";
import FormBody from "../components/edit-form/form-body.vue";
import PageNotFound from "./page-not-found.vue";
import store from "../store";
export default {
  name: "edit-form",
  components: {
    AppBar,
    FormBody,
    // QuestionComponent,
    PageNotFound,
  },
  data: () => ({
    formDetails: {},
    formState: {},
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
        this.formState = JSON.stringify(response.data.data);
        store.commit("changeAppBarTitle", this.formDetails.title);
        store.commit("toggleEdit", true);
      } else {
        this.pageNotFound = true;
      }
    },
    async saveForm(type) {
      let formState = JSON.parse(this.formState);
      if (!arePropertiesSame(this.formDetails, formState)) {
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
        this.formState = JSON.stringify(this.formDetails);
        this.timeout = 2000;
      }
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