<template>
  <v-app>
    <v-app-bar app v-bind:color="themeColor" dense dark>
      <v-img
        class="mx-2"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        max-height="40"
        max-width="40"
        contain
      ></v-img>
      <v-toolbar-title>Create Your Survey Form</v-toolbar-title>
    </v-app-bar>
    <v-main></v-main>
  </v-app>
</template>

<script>
export default {
  name: "AppBar",

  components: {},

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
    ],
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
      return prefs.theme.value;
    },
  },

  computed: {
    themeColor: function () {
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