<template>
  <v-container>
    <v-tabs :color="themeColor" centered v-model="tab">
      <v-tab>Questions</v-tab>
      <v-tab>Responses</v-tab>
    </v-tabs>
  </v-container>
</template>

<script>
import ThemeMixin from "../../mixins/ThemeMixin";
export default {
  name: "FormBody",
  mixins: [ThemeMixin],
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