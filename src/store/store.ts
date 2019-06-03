import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import grid from './modules/grid'
import gridList from './modules/grid-list'
import colorMap from './modules/color-map'

export default new Vuex.Store({
  modules: {
    grid,
    gridList,
    colorMap,
  },
})
