import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: typeof localStorage.getItem('prefs') === 'string' ? JSON.parse(localStorage.getItem('prefs')).dark : false,
    themes: {
      // light: {
      //   primary: '#E53935',
      //   secondary: '#E53935',
      //   accent: '#E53935',
      // error: '#FF5252',
      // info: '#2196F3',
      // success: '#4CAF50',
      // warning: '#FFC107'
      // },
    },
  },
});
