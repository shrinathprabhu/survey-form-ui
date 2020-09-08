<template>
  <v-col>
    <v-row class="px-5 py-2">
      <v-col cols="9">
        <v-text-field flat :color="themeColor" v-model="question.question"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-select
          :color="themeColor"
          placeholder="Answer Type"
          v-model="answerType"
          :items="answerTypes"
          cache-items
          :item-color="themeColor"
        >
          <template v-slot:selection="data">
            <v-icon :color="themeColor" class="px-2">{{data.item.icon}}</v-icon>
            <span>{{data.item.value}}</span>
          </template>
          <template v-slot:item="data">
            <v-icon :color="themeColor" class="px-2">{{data.item.icon}}</v-icon>
            <span>{{data.item.value}}</span>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
export default {
  name: "QuestionFields",
  props: ["question"],
  mixins: [ThemeMixin],
  data: () => ({
    answerTypes: [
      {
        icon: "mdi-comment-text-outline",
        value: "Short answer",
        text: "Short answer",
      },
      {
        icon: "mdi-comment-text-outline",
        value: "Paragraph",
        text: "Paragraph",
      },
      {
        icon: "mdi-radiobox-marked",
        value: "Multiple choice",
        text: "Multiple choice",
      },
      { icon: "mdi-checkbox-marked", value: "Checkbox", text: "Checkbox" },
      {
        icon: "mdi-arrow-down-drop-circle",
        value: "Dropdown",
        text: "Dropdown",
      },
      { icon: "mdi-comment-text-outline", value: "Range", text: "Range" },
      { icon: "mdi-calendar", value: "Date", text: "Date" },
      { icon: "mdi-timer", value: "Time", text: "Time" },
    ],
  }),
  computed: {
    answerType: function () {
      return this.question.answerType;
    },
  },
};
</script>