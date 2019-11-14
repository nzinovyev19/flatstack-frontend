import Vue from 'vue';
import Vuex from 'vuex';
import translations from './modules/translations.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    translations
  },
  state: {
    // normalized: {

    // },
    lang: 'en'
  }
});