<template>
  <div>
    <v-app-bar
      shrink-on-scroll
      prominent
      app
      fixed
      v-bind:color="themeColor"
      dark
    >
      <v-img
        src="../assets/logo.png"
        max-height="35"
        max-width="35"
        class="mt-2 mr-2"
        contain
        style="cursor: pointer"
        @click.stop="navigateToHome"
      ></v-img>
      <v-toolbar-title>{{ appBarTitle }}</v-toolbar-title>
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
      <v-tooltip content-class="small-tooltip" bottom>
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
      v-if="!$vuetify.breakpoint.mobile"
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
      v-if="$vuetify.breakpoint.mobile"
      v-model="changeTheme"
      max-width="290"
    >
      <v-card>
        <template v-slot:prepend>
          <v-row class="my-3 mx-3">
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
        </template>
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
import ChangeThemeColor from "../components/change-theme-color.vue";
import ChangeThemeMode from "../components/change-theme-mode.vue";
export default {
  name: "app-bar",
  mixins: [ThemeMixin],
  components: {
    ChangeThemeColor,
    ChangeThemeMode,
  },
  data: () => ({}),
  methods: {
    navigateToHome() {
      this.$router.push("/");
    },
    emitState(type) {
      this.$emit(type);
    },
  },
  computed: {
    appBarTitle() {
      return store.state.appBarTitle;
    },
    canEdit() {
      return store.state.canEdit;
    },
  },
};
</script>