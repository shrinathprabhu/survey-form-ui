<template>
  <v-container>
    <v-row>
      <v-col class="mr-1">
        <v-card shaped elevation="1" outlined class="pb-n2 mb-5">
          <v-col class="px-6 pb-0 mt-8">
            <v-text-field
              v-model="formDetails.title"
              :color="themeColor"
              height="50"
              :loading="fieldsLoading"
              class="form-title"
              label="Form title"
              @keypress.enter="moveToDescription"
              maxlength="80"
              outlined
            ></v-text-field>
            <!-- </v-col> -->
            <!-- <v-col class="px-6"> -->
            <v-text-field
              v-model="formDetails.description"
              :color="themeColor"
              label="Description"
              :loading="fieldsLoading"
              outlined
              ref="description"
            ></v-text-field>
          </v-col>
        </v-card>
        <v-card
          elevation="1"
          outlined
          class="mb-5 pt-3"
          v-for="(question, index) in formDetails.questionnaires"
          :key="index"
          :id="'question' + index"
        >
          <question-fields
            :question="question"
            :index="index"
            @remove="removeQuestion"
            @move="moveQuestion"
            @auto-save-state-change="autoSave"
            :isLastEl="
              index === formDetails.questionnaires.length - 1 ? true : false
            "
          />
        </v-card>
      </v-col>
      <!-- <v-layout row wrap> -->
      <v-card
        elevation="3"
        style="position: fixed; top: 210px; right: 10px"
        dark
        :color="themeColor"
      >
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
                <!--FIXME remove this span when enabling this button -->
                <span v-bind="attrs" v-on="on">
                  <v-btn disabled icon elevation="0">
                    <v-icon>mdi-format-page-break</v-icon>
                  </v-btn>
                </span>
              </template>
              <span>Add new section (Coming soon)</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom content-class="small-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <!--FIXME remove this span when enabling this button -->
                <span v-bind="attrs" v-on="on">
                  <v-btn disabled icon elevation="0">
                    <v-icon>mdi-cogs</v-icon>
                  </v-btn>
                </span>
              </template>
              <span>Form settings (Coming Soon)</span>
            </v-tooltip>
          </v-row>
          <v-row class="py-1">
            <v-tooltip bottom content-class="small-tooltip">
              <template v-slot:activator="{ on, attrs }">
                <!--FIXME remove this span when enabling this button -->
                <span v-bind="attrs" v-on="on">
                  <v-btn disabled icon elevation="0">
                    <v-icon>mdi-export-variant</v-icon>
                  </v-btn>
                </span>
              </template>
              <span>Export as JSON (Coming Soon)</span>
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
  font-size: 28px;
  font-weight: 500;
}

.small-tooltip {
  font-size: 0.7em;
}
</style>

<script>
import ThemeMixin from "../../mixins/theme-mixin";
import QuestionFields from "./question-fields.vue";
import store from "../../store";
export default {
  name: "question-component",
  mixins: [ThemeMixin],
  components: { QuestionFields },
  props: ["formDetails"],
  updated: function () {
    this.autoSave();
  },
  computed: {
    fieldsLoading() {
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
    autoSave() {
      this.$emit("auto-save-state-change");
    },
  },
  watch: {
    "formDetails.title": function (newTitle) {
      store.commit("changeAppBarTitle", newTitle);
    },
  },
};
</script>