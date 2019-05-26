import { ActionContext } from 'vuex'
import { GridListState, SavedGrid } from './types'

import { retrieveFromStorage } from '@/util/index'

const STORAGE_KEY = 'grid'

function initialState(): GridListState {
  return {
    list: [],
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    SET_GRID_LIST(state: GridListState, payload: SavedGrid[]) {
      state.list = payload;
    },
  },
  actions: {
    async LOAD_GRID_LIST(ctx: ActionContext<GridListState, null>) {
      try {
        const retrievedGrids: SavedGrid[] | null = await retrieveFromStorage(STORAGE_KEY) as SavedGrid[];
        console.log(retrievedGrids)
        if (retrievedGrids) {
          ctx.commit("SET_GRID_LIST", retrieveFromStorage);
          ctx.commit('grid/SET_GRID', retrievedGrids[0], { root: true})
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}