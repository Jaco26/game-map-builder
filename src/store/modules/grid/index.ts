import { ActionContext } from 'vuex';
import { GridTile, GridState, NewGridPayload } from './types'
import { saveToStorage, updateStorage } from '@/util/index'
import { SavedGrid } from '../grid-list/types';

const STORAGE_KEY = 'grid';

function initialState(): GridState {
  return {
    width: 500,
    height: 500,
    cols: 0,
    rows: 0,
    id: null,
    grid: [],
    selected: {
      row: null,
      col: null,
    },
  }
}

export default {
  namespaced: true,
  state: initialState(),
  mutations: {
    SET_GRID(state: GridState, payload: SavedGrid) {
      Object.assign(state, payload);
    },
    SET_SELECTED(state: GridState, payload: { rowIndex: number | null, colIndex: number | null }) {
      const { rowIndex, colIndex } = payload;
      state.selected.row = rowIndex;
      state.selected.col = colIndex;
    },
    SET_TILE_COLOR(state: GridState, payload: string) {
      if (state.selected.row !== null) {
        state.grid[state.selected.row][state.selected.col!].color = payload;
      }
    },
    SIZE_TILES(state: GridState) {
      const width = state.width / state.cols;
      const height = state.height / state.rows;
      state.grid.forEach((row: GridTile[], r) => {
        row.forEach((tile: GridTile, c) => {
          tile.width = width;
          tile.height = height;
          tile.x = c * width;
          tile.y = r * height;
        });
      });
    }
  },
  actions: {
    async GENERATE_NEW_GRID(ctx: ActionContext<GridState, null>, payload: { rows: number, cols: number, name: string }) {
      const { rows, cols, name } = payload;
      const accum: NewGridPayload = { name, rows, cols, grid: [] };
      for (let r = 0; r < rows; r++) {
        const row: GridTile[] = [];
        for (let c = 0; c < cols; c++) {
          row.push(new GridTile(r, c));
        }
        accum.grid.push(row);
      }
      ctx.commit("SET_GRID", accum);
      await saveToStorage(STORAGE_KEY, accum);
      ctx.dispatch('gridList/LOAD_GRID_LIST', null, { root: true });
    },
    SAVE_GRID(ctx: ActionContext<GridState, null>) {
      
      const { rows, cols, grid, id } = ctx.state;
      console.log('saving', id)
      if (id !== null) {
        updateStorage(STORAGE_KEY, id, { rows, cols, grid });
      }
    },
  },
  getters: {
    selectedTile(state: GridState): GridTile | null {
      if (state.selected.row !== null) {
        return state.grid[state.selected.row][state.selected.col!];
      }
      return null
    }
  }
}