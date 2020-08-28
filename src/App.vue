<template>
  <v-app>
    <v-app-bar shrink-on-scroll hide-on-scroll prominent app v-bind:color="themeColor" dark>
      <v-img src="./assets/logo.png" max-height="35" max-width="35" class="mt-2 mr-2" contain></v-img>
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
          <!-- <v-col> -->
          <v-icon v-bind:color="themeColor">mdi-palette-outline</v-icon>
          <!-- </v-col> -->
          <v-col>Theme Options</v-col>
          <v-btn class="mt-1" icon @click.stop="changeTheme = false">
            <v-icon>mdi-window-close</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-divider></v-divider>
      <template>
        <v-subheader>Theme Color</v-subheader>
        <v-row class="mx-1">
          <v-col class="mx-1" style="width: 35px" v-for="color in colors" :key="color + Date.now()">
            <v-btn fab elevation="0" x-small :color="color.value" @click="changeThemeColor(color)">
              <v-icon v-if="color.value === themeColor" style="color: white">mdi-check</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>

    <v-main>
      <AppBody />
    </v-main>
  </v-app>
</template>

<script>
import AppBody from "./components/AppBody";
import store from "./store";
export default {
  name: "App",

  components: {
    AppBody,
  },

  data: () => ({
    colors: [
      {
        name: "Red",
        value: "red darken-1",
      },
      {
        name: "Purple",
        value: "purple darken-4",
      },
      {
        name: "Pink",
        value: "pink",
      },
      {
        name: "Deep Purple",
        value: "deep-purple darken-1",
      },
      {
        name: "Indigo",
        value: "indigo darken-1",
      },
      {
        name: "Teal",
        value: "teal",
      },
      {
        name: "Blue",
        value: "blue darken-1",
      },
      {
        name: "Dark Lime",
        value: "lime darken-3",
      },
      {
        name: "Green",
        value: "green darken-1",
      },
      {
        name: "Orange",
        value: "orange darken-1",
      },
      {
        name: "Deep Orange",
        value: "deep-orange",
      },
      {
        name: "Brown",
        value: "brown darken-2",
      },
      {
        name: "Grey",
        value: "blue-grey",
      },
      {
        name: "Dark Grey",
        value: "grey darken-4",
      },
      {
        name: "Dark Yellow",
        value: "yellow darken-1",
      },
    ],
    changeTheme: false,
  }),

  methods: {
    generateRandomColor() {
      return this.colors[Math.round(Math.random() * this.colors.length)];
    },
    createSessionTheme() {
      let prefs = sessionStorage.getItem("prefs");
      if (prefs) {
        prefs = JSON.parse(prefs);
        if (prefs.theme && prefs.theme.value) {
          // Do nothing
        } else {
          prefs.theme = this.generateRandomColor();
          sessionStorage.setItem("prefs", prefs);
        }
      } else {
        prefs = {
          theme: this.generateRandomColor(),
        };
        sessionStorage.setItem("prefs", JSON.stringify(prefs));
      }
      store.commit("changeThemeColor", prefs.theme);
      return prefs.theme.value;
    },
    changeThemeColor(theme) {
      let prefs = localStorage.getItem("prefs");
      let prefsSession = sessionStorage.getItem("prefs");
      if (prefs) {
        prefs = JSON.parse(prefs);
        prefs.theme = theme;
      } else {
        prefs = { theme };
      }
      localStorage.setItem("prefs", JSON.stringify(prefs));
      if (prefsSession) {
        prefsSession = JSON.parse(prefsSession);
        prefsSession.theme = theme;
      } else {
        prefsSession = { theme };
      }
      sessionStorage.setItem("prefs", JSON.stringify(prefsSession));
      store.commit("changeThemeColor", prefs.theme);
    },
  },

  computed: {
    themeColor: function () {
      let theme = store.state.theme;
      if (theme && theme.value) {
        return theme.value;
      }
      let prefs = localStorage.getItem("prefs");
      if (prefs) {
        prefs = JSON.parse(prefs);
        if (prefs.theme && prefs.theme.name && prefs.theme.value) {
          if (this.colors.find((color) => color.value === prefs.theme.value)) {
            return prefs.theme.value;
          }
        }
      }
      return this.createSessionTheme();
    },
  },
};
</script>