<template>
  <v-col>
    <v-row class="px-5">
      <v-col cols="6" md="9" class="py-0">
        <v-text-field flat :color="themeColor" v-model="question.question" placeholder="Question"></v-text-field>
      </v-col>
      <v-col cols="6" md="3" class="py-0">
        <v-select
          :color="themeColor"
          placeholder="Answer Type"
          v-model="question.answerType"
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
    <v-row class="mx-3 px-3" v-if="isDescription">
      <v-text-field
        flat
        :color="themeColor"
        v-model="question.description"
        placeholder="Description"
      ></v-text-field>
    </v-row>
    <v-row class="px-5">
      <v-col cols="9" class="py-0" v-if="question.answerType === 'Short answer'">
        <v-text-field placeholder="Short answer" disabled></v-text-field>
      </v-col>
      <v-col cols="12" class="py-0" v-if="question.answerType === 'Paragraph'">
        <v-textarea placeholder="Paragraph" disabled no-resize rows="2"></v-textarea>
      </v-col>
      <v-col
        cols="10"
        class="py-0"
        v-if="['Multiple choice', 'Checkbox', 'Dropdown'].includes(question.answerType)"
      >
        <v-row v-for="(option, index) in options" :key="index">
          <v-icon
            v-if="question.answerType === 'Multiple choice'"
            class="mr-2 mt-n2 ml-1"
          >mdi-radiobox-blank</v-icon>
          <v-icon
            v-if="question.answerType === 'Checkbox'"
            class="mr-2 mt-n2 ml-1"
          >mdi-checkbox-blank-outline</v-icon>
          <span
            v-if="question.answerType === 'Dropdown'"
            class="mr-3 mt-4 ml-2"
            style="font-size: 1.3em"
          >{{(index+1)}}.</span>
          <v-text-field
            v-model="options[index].name"
            :color="themeColor"
            @keypress="addOptionOnEnter($event, index)"
            :disabled="options[index].other"
            :autofocus="index === optionFocusIndex"
          ></v-text-field>
          <v-tooltip content-class="small-tooltip" v-if="options.length > 1" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                icon
                class="mt-6 ml-3"
                @click.stop="removeOption(index)"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
            <span>Remove option</span>
          </v-tooltip>
        </v-row>
        <div>
          <v-btn text link :color="themeColor" class="mr-1" @click.stop="addOption()">Add option</v-btn>
          <span v-if="!otherAdded">or</span>
          <v-btn
            v-if="!otherAdded"
            text
            link
            :color="themeColor"
            class="ml-1"
            @click.stop="addOther()"
          >add "Other"</v-btn>
        </div>
      </v-col>
      <v-col cols="12" class="py-0" v-if="question.answerType === 'Range'">
        <v-row>
          <v-col cols="4" sm="3" md="2">
            <v-text-field
              :color="themeColor"
              placeholder="Lower limit"
              label="Lower limit"
              hint="Lower Limit"
              v-model="range.lowerLimit"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="3" md="2">
            <v-text-field
              :color="themeColor"
              placeholder="Upper limit"
              label="Upper limit"
              hint="Upper Limit"
              v-model="range.upperLimit"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col cols="4" sm="3" md="2">
            <v-text-field
              :color="themeColor"
              placeholder="Number of steps"
              label="Number of steps"
              hint="Number of steps"
              v-model="range.numberOfSteps"
              type="number"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-switch :color="themeColor" v-model="range.single" label="Switch to single mode"></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <span class="mt-1 mx-2">Sample Range Slider:</span>
          <v-slider
            :color="themeColor"
            hide-details
            thumb-label
            :min="range.lowerLimit"
            :max="range.upperLimit"
            :step="range.numberOfSteps"
            v-if="range.single"
          ></v-slider>
          <v-range-slider
            :color="themeColor"
            hide-details
            :track-fill-color="'red'"
            thumb-label
            :min="range.lowerLimit"
            :max="range.upperLimit"
            :step="range.numberOfSteps"
            v-else
          ></v-range-slider>
        </v-row>
      </v-col>
      <v-col cols="3" class="py-0" v-if="question.answerType === 'Date'">
        <v-text-field disabled label="Month, day, year" append-icon="mdi-calendar" readonly></v-text-field>
      </v-col>
      <v-col cols="2" class="py-0" v-if="question.answerType === 'Time'">
        <v-text-field disabled label="Time" append-icon="mdi-timer" readonly></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2"></v-divider>
    <v-row class="mx-3 px-3" justify="end">
      <v-switch :color="themeColor" v-model="isDescription" label="Description" class="mr-5"></v-switch>
      <v-switch :color="themeColor" v-model="isRequired" label="Required"></v-switch>
    </v-row>
  </v-col>
</template>

<style scoped>
.small-tooltip {
  font-size: 0.7em;
}
</style>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
export default {
  name: "QuestionFields",
  props: ["question"],
  mixins: [ThemeMixin],
  data: () => ({
    otherAdded: false,
    optionFocusIndex: false,
    answerTypes: [
      {
        icon: "mdi-comment-text-outline",
        value: "Short answer",
        text: "Short answer",
      },
      {
        icon: "mdi-view-headline",
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
      { icon: "mdi-ray-start-end", value: "Range", text: "Range" },
      { icon: "mdi-calendar", value: "Date", text: "Date" },
      { icon: "mdi-timer", value: "Time", text: "Time" },
      {
        icon: "mdi-cloud-upload",
        value: "File upload (Coming soon)",
        text: "File upload",
        disabled: true,
      },
    ],
    options: [],
    range: {
      lowerLimit: 0,
      upperLimit: 100,
      numberOfSteps: 1,
      single: false,
    },
    isRequired: false,
    isDescription: false,
  }),
  mounted: function () {
    this.question.answerType = this.question.answerType || "Short answer";
    this.options = this.question.options || [];
    if (this.options.length === 0) {
      this.options.push({
        rank: 1,
        name: "Option 1",
      });
    } else {
      this.options = this.options.sort((o1, o2) => o1.rank - o2.rank);
    }
  },
  methods: {
    addOption() {
      let nextIndex = this.options.length;
      let otherIndex = this.options.findIndex(
        (option) => option.other === true
      );
      if (otherIndex > -1) {
        this.options[otherIndex] = {
          rank: nextIndex,
          name: "Option " + nextIndex,
        };
        this.options.push({
          rank: nextIndex,
          name: "Other",
          other: true,
        });
        this.optionFocusIndex = otherIndex;
      } else {
        this.options.push({
          rank: nextIndex + 1,
          name: "Option " + (nextIndex + 1),
        });
        this.optionFocusIndex = nextIndex;
      }
    },
    addOther() {
      this.otherAdded = true;
      let nextIndex = this.options.length + 1;
      this.options.push({
        rank: nextIndex,
        name: "Other",
        other: true,
      });
    },
    addOptionOnEnter(event) {
      if (event.key === "Enter") {
        this.addOption();
      }
    },
    removeOption(index) {
      if (this.options[index].other === true) {
        this.otherAdded = !this.otherAdded;
      }
      this.options.splice(index, 1);
    },
  },
};
</script>