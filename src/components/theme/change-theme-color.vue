<template>
  <div>
    <v-subheader>Theme Color</v-subheader>
    <v-row class="mx-1">
      <v-col
        :class="$vuetify.breakpoint.mobile ? 'mx-2' : 'mx-1'"
        style="width: 35px"
        v-for="color in colors"
        :key="color.name"
      >
        <v-tooltip
          bottom
          content-class="small-tooltip"
          dark
          :color="color.value"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              :ripple="false"
              fab
              elevation="0"
              x-small
              :color="color.value"
              @click.stop="changeThemeColor(color)"
              :aria-label="color.name"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon v-if="color.value === themeColor" style="color: white"
                >mdi-check</v-icon
              >
            </v-btn>
          </template>
          <span>{{ color.name }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.small-tooltip {
  font-size: 0.7em;
}
</style>

<script>
import ThemeMixin from "../../mixins/theme-mixin";
export default {
  name: "change-theme-color",
  mixins: [ThemeMixin],
  components: {},
  data: () => ({}),
  methods: {},
  computed: {},
};
</script>