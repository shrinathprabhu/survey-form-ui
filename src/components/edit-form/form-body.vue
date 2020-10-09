<template>
  <v-container>
    <v-tabs :color="themeColor" centered v-model="tab">
      <v-tab>Questions</v-tab>
      <v-tab>Responses</v-tab>
      <v-tab v-if="formDetails.isPublished" v-bind="attrs" v-on="on"
        >Responses</v-tab
      >
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <question-component
          :formDetails="formDetails"
          @auto-save-state-change="autoSave"
        />
      </v-tab-item>
      <v-tab-item>
        <responses-component />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ThemeMixin from "../../mixins/theme-mixin";
import QuestionComponent from "./question-component.vue";
import ResponsesComponent from "./responses-component.vue";
export default {
  name: "form-body",
  components: { QuestionComponent, ResponsesComponent },
  mixins: [ThemeMixin],
  props: ["formDetails"],
  data: () => ({
    tab: "questions",
  }),
  mounted: async function () {},
  methods: {
    autoSave() {
      this.$emit("auto-save-state-change");
    },
  },

  computed: {},
};
</script>