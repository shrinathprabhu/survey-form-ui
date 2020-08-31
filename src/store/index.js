import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: {
      name: '',
      value: ''
    },
    dark: false
  },
  mutations: {
    changeThemeColor(state, theme) {
      state.theme = theme
    },
    changeThemeMode(state, dark) {
      state.dark = dark
    }
  },
  actions: {
  },
  modules: {
  }
})
