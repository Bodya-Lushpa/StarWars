import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'


Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})