import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router.js';
import store from './store/store';

import vSelect from 'vue-select';
import Vuelidate from 'vuelidate';
import { TheMask } from 'vue-the-mask';

Vue.config.productionTip = false;

Vue.component('BaseInputSelect', vSelect);
Vue.component('BaseInputMask', TheMask);

Vue.prototype.$axios = axios;

Vue.use(Vuelidate);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
