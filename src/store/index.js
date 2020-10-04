import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: {
      name: '',
      value: ''
    },
    dark: false,
    changeTheme: false,
    colors: [
      {
        name: "Red",
        value: "red darken-1",
        icon: "red.png"
      },
      {
        name: "Purple",
        value: "purple darken-4",
        icon: "purple.png"
      },
      {
        name: "Pink",
        value: "pink",
        icon: "pink.png"
      },
      {
        name: "Deep Purple",
        value: "deep-purple darken-1",
        icon: "deep-purple.png"
      },
      {
        name: "Indigo",
        value: "indigo darken-1",
        icon: "indigo.png"
      },
      {
        name: "Teal",
        value: "teal",
        icon: "teal.png"
      },
      {
        name: "Blue",
        value: "blue darken-1",
        icon: "blue.png"
      },
      {
        name: "Dark Lime",
        value: "lime darken-3",
        icon: "lime.png"
      },
      {
        name: "Green",
        value: "green darken-1",
        icon: "green.png"
      },
      {
        name: "Orange",
        value: "orange darken-1",
        icon: "orange.png"
      },
      {
        name: "Deep Orange",
        value: "deep-orange",
        icon: "deep-orange.png"
      },
      {
        name: "Brown",
        value: "brown darken-2",
        icon: "brown.png"
      },
      {
        name: "Grey",
        value: "blue-grey",
        icon: "blue-grey.png"
      },
      {
        name: "Dark Grey",
        value: "grey darken-3",
        icon: "grey.png"
      },
      {
        name: "Dark Yellow",
        value: "yellow darken-2",
        icon: "yellow.png"
      },
    ],
    appBarTitle: "",
    canEdit: false
  },
  mutations: {
    changeThemeColor(state, theme) {
      state.theme = theme;
    },
    changeThemeMode(state, dark) {
      state.dark = dark;
    },
    toggleNav(state, changeTheme) {
      state.changeTheme = changeTheme;
    },
    changeAppBarTitle(state, appBarTitle) {
      window.document.title = appBarTitle.length ? appBarTitle : 'Untitled Form';
      state.appBarTitle = appBarTitle;
    },
    toggleEdit(state, canEdit) {
      state.canEdit = canEdit;
    }
  },
  actions: {
  },
  modules: {
  }
});