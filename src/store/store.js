import Vue from 'vue';
import Vuex from 'vuex';
import translations from './modules/translations.js';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    translations
  },
  state: {
    lang: 'en',

    enteredData: null,
    selectedProducts: [
      {
        id: 'asdaseptascript',
        photo: '',
        name: 'The Chelsea Boot',
        descr: 'Black',
        quantity: '1',
        price: '235',
      },
      {
        id: 'asdaseptascriptg',
        photo: '',
        name: 'The Twill Snap Backpack',
        descr: 'Reverse Denim + Brown leather',
        quantity: '1',
        price: '205',
      },
      {
        id: 'asdaseptascriptgg',
        photo: '',
        name: 'The Twill Zip Tote',
        descr: 'Reverse Denim + Black leather',
        quantity: '1',
        price: '95',
      }
    ]
  },
  plugins: [
    createPersistedState({
      paths: ['enteredData']
    })
  ],
  mutations: {
    setEnteredData: (state, data) => {
      state.enteredData = data;
    }
  }
});