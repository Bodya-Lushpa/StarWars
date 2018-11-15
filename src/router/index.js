import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '../components/Film.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/Film/:id',
      component: Film,
      props: true
    }
  ],
  mode: 'history'
})
