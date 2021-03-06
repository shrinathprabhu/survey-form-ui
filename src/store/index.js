import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: {
      name: "",
      value: "",
      icon: "",
    },
    dark: false,
    changeTheme: false,
    colors: [
      {
        name: "Red",
        value: "red darken-1",
      },
      {
        name: "Purple",
        value: "purple darken-1",
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
        name: "Lime",
        value: "lime darken-3",
      },
      {
        name: "Green",
        value: "green darken-1",
      },
      {
        name: "Orange",
        value: "orange darken-3",
      },
      {
        name: "Deep Orange",
        value: "deep-orange darken-2",
      },
      {
        name: "Brown",
        value: "brown darken-2",
      },
      {
        name: "Blue Grey",
        value: "blue-grey",
      },
      {
        name: "Grey",
        value: "grey darken-3",
      },
      {
        name: "Dark Pink",
        value: "pink darken-3",
      },
    ],
    appBarTitle: "",
    canEdit: false,
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
      window.document.title = appBarTitle.length
        ? appBarTitle
        : "Untitled Form";
      state.appBarTitle = appBarTitle;
    },
    toggleEdit(state, canEdit) {
      state.canEdit = canEdit;
    },
  },
  actions: {},
  modules: {},
});
