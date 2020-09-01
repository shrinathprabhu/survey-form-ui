<template>
  <div>
    <v-app-bar shrink-on-scroll hide-on-scroll prominent app v-bind:color="themeColor" dark>
      <v-img src="../assets/logo.png" max-height="35" max-width="35" class="mt-2 mr-2" contain></v-img>
      <v-toolbar-title>Create Your Survey Form</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon>
            <v-btn icon v-bind="attrs" v-on="on" @click.stop="changeTheme = true">
              <v-icon>mdi-palette-outline</v-icon>
            </v-btn>
          </v-app-bar-nav-icon>
        </template>
        <span>Change theme</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer absolute temporary right v-model="changeTheme">
      <template v-slot:prepend>
        <v-row class="my-3 mx-3">
          <v-icon v-bind:color="themeColor">mdi-palette-outline</v-icon>
          <v-col>Theme Options</v-col>
          <v-btn class="mt-1" icon @click.stop="changeTheme = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-divider></v-divider>
      <ChangeThemeColor />
      <v-divider></v-divider>
      <ChangeThemeMode />
    </v-navigation-drawer>
  </div>
</template>

<script>
import ThemeMixin from "../mixins/ThemeMixin";
import ChangeThemeColor from "../components/ChangeThemeColor";
import ChangeThemeMode from "../components/ChangeThemeMode";
export default {
  name: "AppBar",
  mixins: [ThemeMixin],
  components: {
    ChangeThemeColor,
    ChangeThemeMode,
  },
  data: () => ({}),
  methods: {},
  computed: {},
};
</script>