import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import grid from './grid'

export default new Vuex.Store({
  modules: {
    grid,
  },
})
