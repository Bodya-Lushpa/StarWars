import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import * as firebase from 'firebase'

Vue.use(firebase)
Vue.use(VueFire)
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyAZyU6iz8AH2dl45aTwRg2M0psTxTY2OXE",
      authDomain: "starwars-4770f.firebaseapp.com",
      databaseURL: "https://starwars-4770f.firebaseio.com",
      projectId: "starwars-4770f",
      storageBucket: "starwars-4770f.appspot.com",
      messagingSenderId: "890920326646"
    })
  }
})
