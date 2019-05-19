import Vue from 'vue'
import Router from 'vue-router'
import VueHelp from './views/VueHelp.vue'
import Sandbox from './views/Sandbox.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/sandbox',
    },
    {
      path: '/sandbox',
      name: 'sandbox',
      component: Sandbox,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/vue-help',
      name: 'vue-help',
      component: VueHelp
    },
  ]
})
