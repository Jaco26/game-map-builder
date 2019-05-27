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
        if (retrievedGrids) {
          ctx.commit("SET_GRID_LIST", retrievedGrids);
        }
      } catch (error) {
        console.error(error);
      }
    },
    SELECT_GRID(ctx: ActionContext<GridListState, null>, payload: number) {
      const grid = ctx.state.list.find(g => g.id === payload);
      if (grid) {
        ctx.commit('grid/SET_GRID', grid, { root: true });
      }
    }
  }
}