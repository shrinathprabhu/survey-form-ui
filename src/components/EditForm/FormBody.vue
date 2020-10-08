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
        <QuestionComponent
          :formDetails="formDetails"
          @auto-save-state-change="autoSave"
        />
      </v-tab-item>
      <v-tab-item>
        <ResponsesComponent />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
import QuestionComponent from "./QuestionComponent.vue";
import ResponsesComponent from "./ResponsesComponent.vue";
export default {
  name: "FormBody",
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