import Vue from 'vue'
import Router from 'vue-router'
import Sandbox from './views/Sandbox.vue'
import CreateTileComponent from './views/TilePainterV2.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
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
      path: '/create-tile',
      name: 'create-tile',
      component: CreateTileComponent,
    }
  ]
})
