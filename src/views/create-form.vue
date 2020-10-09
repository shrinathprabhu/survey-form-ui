<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-col justify="center" align="center">
          <v-progress-circular
            :color="themeColor"
            indeterminate
            rotate
            size="90"
            width="5"
          ></v-progress-circular>
          <v-row justify="center" align="center" class="mt-3 pt-3"
            >Creating a new form. Please wait{{ loadingDots }}</v-row
          >
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ThemeMixin from "../mixins/theme-mixin";
export default {
  name: "create-form",
  mixins: [ThemeMixin],
  data: () => ({
    loadingDots: ".  ",
  }),
  mounted: async function () {
    let loader = setInterval(() => {
      if (this.loadingDots === ".  ") {
        this.loadingDots = ".. ";
      } else if (this.loadingDots === ".. ") {
        this.loadingDots = "...";
      } else {
        this.loadingDots = ".  ";
      }
    }, 1000);
    try {
      let responseData = await this.createForm();
      this.$router.push(`/forms/${responseData.id}/edit`);
    } catch (e) {
      this.$router.push("/500");
    }
    clearInterval(loader);
  },
  methods: {
    async createForm() {
      let response = await this.axios.post(
        process.env.VUE_APP_BASE_URL + "/forms/create"
      );
      if (response.status === 200) {
        if (response.data && response.data.code === 200) {
          return response.data.data;
        } else throw response.data.message;
      } else throw response.statusMessage;
    },
  },
};
</script>