<template>
  <v-container>
    <v-row>
      <v-col class="mr-1">
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
              @keypress.enter="moveToDescription"
              autofocus
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
              ref="description"
            ></v-text-field>
          </v-col>
        </v-card>
        <v-card
          elevation="2"
          outlined
          class="mt-3 mb-3"
          v-for="(question, index) in formDetails.questionnaires"
          :key="index"
          :id="'question' + index"
        >
          <QuestionFields
            :question="question"
            :index="index"
            @remove="removeQuestion"
            @move="moveQuestion"
            :isLastEl="
              index === formDetails.questionnaires.length - 1 ? true : false
            "
          />
        </v-card>
      </v-col>
      <!-- <v-layout row wrap> -->
      <v-card elevation="3" style="position: fixed; top: 210px; right: 10px">
        <v-col class="px-5">
          <v-row class="py-1">
            <v-tooltip bottom content-class="small-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  elevation="0"
                  @click.stop="addQuestion"
                >
                  <v-icon>mdi-plus-circle-outline</v-icon>
                </v-btn>
              </template>
              <span>Add new question</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom content-class="small-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon elevation="0">
                  <v-icon>mdi-format-page-break</v-icon>
                </v-btn>
              </template>
              <span>Add new section</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom content-class="small-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon elevation="0">
                  <v-icon>mdi-cogs</v-icon>
                </v-btn>
              </template>
              <span>Form settings</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom content-class="small-tooltip">
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

.small-tooltip {
  font-size: 0.7em;
}
</style>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
import QuestionFields from "./QuestionFields";
import store from "../../store";
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
  data: () => ({}),
  methods: {
    addQuestion() {
      this.formDetails = this.formDetails || {};
      this.formDetails.questionnaires = this.formDetails.questionnaires || [];
      this.formDetails.questionnaires.push({
        question: "Untitled Question",
        answerType: "Short answer",
      });
      this.$nextTick(() => {
        let length = this.formDetails.questionnaires.length - 1;
        let refName = "question" + length;
        document.getElementById(refName).scrollIntoView({ behavior: "smooth" });
      });
    },
    moveToDescription() {
      this.$refs.description.focus();
    },
    removeQuestion(e) {
      this.formDetails.questionnaires.splice(e.index, 1);
    },
    moveQuestion(e) {
      let questionnaires = this.formDetails.questionnaires;
      if (e.type === "up") {
        let temp = questionnaires[e.index];
        questionnaires[e.index] = questionnaires[e.index - 1];
        questionnaires[e.index - 1] = temp;
      } else {
        let temp = questionnaires[e.index];
        questionnaires[e.index] = questionnaires[e.index + 1];
        questionnaires[e.index + 1] = temp;
      }
      this.formDetails.questionnaires = [...questionnaires];
    },
  },
  watch: {
    "formDetails.title": function (newTitle) {
      store.commit("changeAppBarTitle", newTitle);
    },
  },
};
</script>