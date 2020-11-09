<template>
  <div>
    <v-app-bar app fixed v-bind:color="themeColor" dark flat>
      <v-img
        src="../assets/logo.png"
        max-height="35"
        max-width="35"
        class="mr-2"
        contain
        style="cursor: pointer"
        @click.stop="navigateToHome"
      ></v-img>
      <v-toolbar-title class="mt-2">{{ appBarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip content-class="small-tooltip" v-if="canEdit" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon>
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="emitState('preview')"
              aria-label="Click to preview"
            >
              <v-icon>mdi-eye-outline</v-icon>
            </v-btn>
          </v-app-bar-nav-icon>
        </template>
        <span>Preview</span>
      </v-tooltip>
      <v-tooltip content-class="small-tooltip" v-if="canEdit" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon>
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="emitState('save')"
              aria-label="Save changes"
            >
              <v-icon>mdi-content-save-outline</v-icon>
            </v-btn>
          </v-app-bar-nav-icon>
        </template>
        <span>Save changes</span>
      </v-tooltip>
      <v-tooltip content-class="small-tooltip" v-if="canEdit" bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon>
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="emitState('publish')"
              aria-label="Publish form to the web"
            >
              <v-icon>mdi-publish</v-icon>
            </v-btn>
          </v-app-bar-nav-icon>
        </template>
        <span>Publish form</span>
      </v-tooltip>
      <v-tooltip content-class="small-tooltip" bottom v-if="showThemeButton">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon>
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              @click.stop="changeTheme = true"
              aria-label="Change Theme - Change color and light mode of the app"
            >
              <v-icon>mdi-palette-outline</v-icon>
            </v-btn>
          </v-app-bar-nav-icon>
        </template>
        <span>Change theme</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer
      v-if="!$vuetify.breakpoint.mobile && showThemeButton"
      fixed
      temporary
      right
      v-model="changeTheme"
    >
      <template v-slot:prepend>
        <v-row class="my-3 mx-3">
          <v-icon v-bind:color="themeColor">mdi-palette-outline</v-icon>
          <v-col>Theme Options</v-col>
          <v-btn
            class="mt-1"
            icon
            @click.stop="changeTheme = false"
            aria-label="Close theme drawer"
          >
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-divider></v-divider>
      <change-theme-color />
      <v-divider></v-divider>
      <change-theme-mode />
    </v-navigation-drawer>

    <v-dialog
      v-if="$vuetify.breakpoint.mobile && showThemeButton"
      v-model="changeTheme"
      max-width="290"
    >
      <v-card>
        <v-card-title>
          <v-row>
            <v-icon v-bind:color="themeColor">mdi-palette-outline</v-icon>
            <v-col>Theme Options</v-col>
            <v-btn
              class="mt-1"
              icon
              @click.stop="changeTheme = false"
              aria-label="Close theme dialog box"
            >
              <v-icon>mdi-window-close</v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <change-theme-color />
        <v-divider></v-divider>
        <change-theme-mode />
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            :color="themeColor"
            text
            @click="changeTheme = false"
            aria-label="Theme selected ok and close"
            >Ok</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.small-tooltip {
  font-size: 0.7em;
}
</style>

<script>
import ThemeMixin from "../mixins/theme-mixin";
import store from "../store";
import ChangeThemeColor from "../components/theme/change-theme-color.vue";
import ChangeThemeMode from "../components/theme/change-theme-mode.vue";
export default {
  name: "app-bar",
  mixins: [ThemeMixin],
  props: ["title", "prominent", "hideThemeChanger"],
  components: {
    ChangeThemeColor,
    ChangeThemeMode,
  },
  data: () => ({
    changeTheme: false,
  }),
  methods: {
    navigateToHome() {
      if (window.location.pathname !== "/forms") {
        this.$router.push("/");
      }
    },
    emitState(type) {
      this.$emit(type);
    },
  },
  computed: {
    appBarTitle() {
      return this.title || store.state.appBarTitle;
    },
    canEdit() {
      return store.state.canEdit;
    },
    isProminent() {
      return this.prominent === false ? false : true;
    },
    showThemeButton() {
      return !this.hideThemeChanger;
    },
  },
};
</script>