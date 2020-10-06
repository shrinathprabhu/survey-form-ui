<template>
  <v-container>
    <v-tabs :color="themeColor" centered v-model="tab">
      <v-tab>Questions</v-tab>
      <v-tooltip
        v-if="!formDetails.isPublished"
        content-class="small-tooltip"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on">Responses</v-tab>
        </template>
        <span>Publish the form to start getting responses</span>
      </v-tooltip>
      <v-tab v-if="formDetails.isPublished" v-bind="attrs" v-on="on"
        >Responses</v-tab
      >
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <QuestionComponent :formDetails="formDetails" />
      </v-tab-item>
      <v-tab-item>
        <ResponsesComponent />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
import QuestionComponent from "./QuestionComponent";
import ResponsesComponent from "./ResponsesComponent";
export default {
  name: "FormBody",
  components: { QuestionComponent, ResponsesComponent },
  mixins: [ThemeMixin],
  props: ["formDetails"],
  data: () => ({
    tab: "questions",
  }),
  mounted: async function () {
    let id = this.$route.params.id;
    console.log(id);
  },
  methods: {},

  computed: {},
};
</script>