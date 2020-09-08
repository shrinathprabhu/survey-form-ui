<template>
  <v-container>
    <v-row>
      <v-col class="mr-5">
        <v-card shaped elevation="2" outlined class="pb-5 mb-5">
          <v-col class="px-6" style="padding-bottom: 0">
            <v-text-field
              flat
              v-model="formDetails.title"
              :color="themeColor"
              height="50px"
              :loading="fieldsLoading"
              class="form-title"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col class="px-6">
            <v-text-field
              flat
              v-model="formDetails.description"
              :color="themeColor"
              placeholder="Description"
              :loading="fieldsLoading"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
        </v-card>
        <v-card
          elevation="2"
          outlined
          class="mt-3 mb-3"
          v-for="(question, index) in formDetails.questionnaires"
          :key="index"
        >
          <QuestionFields :question="question" />
        </v-card>
      </v-col>
      <!-- <v-layout row wrap> -->
      <v-card elevation="3" style="position: fixed; right: 10px">
        <v-col class="px-5">
          <v-row class="py-1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon elevation="0" @click.stop="addQuestion()">
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>Add new question</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon elevation="0">
                  <v-icon>mdi-format-page-break</v-icon>
                </v-btn>
              </template>
              <span>Add new section</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon elevation="0">
                  <v-icon>mdi-cogs</v-icon>
                </v-btn>
              </template>
              <span>Form settings</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon elevation="0">
                  <v-icon>mdi-export-variant</v-icon>
                </v-btn>
              </template>
              <span>Export as JSON</span>
            </v-tooltip>
          </v-row>
        </v-col>
      </v-card>
      <!-- </v-layout> -->
    </v-row>
  </v-container>
</template>

<style scoped>
.form-title {
  font-size: 36px;
}
</style>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
import QuestionFields from "./QuestionFields";
export default {
  name: "QuestionComponent",
  mixins: [ThemeMixin],
  components: { QuestionFields },
  props: ["formDetails"],
  computed: {
    fieldsLoading: function () {
      return this.formDetails ? false : true;
    },
  },
  methods: {
    addQuestion: function () {
      this.formDetails = this.formDetails || {};
      this.formDetails.questionnaires = this.formDetails.questionnaires || [];
      this.formDetails.questionnaires.push({
        question: "Untitled Question",
        answerType: "Short answer",
      });
    },
  },
};
</script>