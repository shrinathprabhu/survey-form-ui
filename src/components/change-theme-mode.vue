<template>
  <div>
    <v-subheader>Theme Mode</v-subheader>
    <v-row class="mx-1">
      <v-col class="mx-1">
        <v-switch
          v-model="$vuetify.theme.dark"
          :click="captureThemeMode()"
          hide-details
          inset
          :color="themeColor"
          :label="
            $vuetify.theme.dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'
          "
        ></v-switch>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ThemeMixin from "../mixins/theme-mixin";
export default {
  name: "change-theme-mode",
  mixins: [ThemeMixin],
  components: {},
  data: () => ({}),
  methods: {},
  computed: {},
};
</script>