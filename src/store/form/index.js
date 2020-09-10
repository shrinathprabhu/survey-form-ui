import Vue from 'vue';
import Vuex from 'vuex';
import store from '../';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        form: {}
    },
    actions: {},
    mutations: {
        updateForm(state, form) {
            state.form = form;
            window.document.title = form.title;
            store.commit("changeAppBarTitle", form.title);
        }
    },
    modules: {}
});