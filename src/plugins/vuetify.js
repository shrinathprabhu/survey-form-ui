import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

console.log(localStorage.getItem('prefs'));

export default new Vuetify({
  theme: {
    themes: {
      dark: typeof localStorage.getItem('prefs') === 'string' ? JSON.parse(localStorage.getItem('prefs')).dark : false,
      light: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
