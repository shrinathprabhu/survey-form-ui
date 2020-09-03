<template>
  <v-container>
    <v-card>
      <v-col class="px-5">
        <v-text-field
          flat
          v-model="formDetails.title"
          :color="themeColor"
          :loading="fieldsLoading"
          class="py-5 form-title"
        ></v-text-field>
      </v-col>
    </v-card>
  </v-container>
</template>

<style scoped>
.form-title {
  font-size: 36px;
}
</style>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
export default {
  name: "QuestionComponent",
  mixins: [ThemeMixin],
  props: ["formDetails"],
  computed: {
    fieldsLoading: function () {
      return this.formDetails ? false : true;
    },
  },
};
</script>