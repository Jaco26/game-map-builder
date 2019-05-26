import { ActionContext } from 'vuex';
import { GridTile, GridState, NewGridPayload } from './types'
import { saveToStorage, retrieveFromStorage } from '@/util/index'

const STORAGE_KEY = 'grid';

function initialState(): GridState {
  return {
    width: 500,
    height: 600,
    cols: 0,
    rows: 0,
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
    SET_GRID(state: GridState, payload: NewGridPayload) {
      Object.assign(state, payload);
    },
    SET_SELECTED(state: GridState, payload: { rowIndex: number | null, colIndex: number | null }) {
      const { rowIndex, colIndex } = payload;
      state.selected.row = rowIndex;
      state.selected.col = colIndex;
    },
    SET_TILE_COLOR(state: GridState, payload: string) {
      if (state.selected.row) {
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
    GENERATE_NEW_GRID(ctx: ActionContext<GridState, null>, payload: { rows: number, cols: number, name: string }) {
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
      saveToStorage(STORAGE_KEY, accum);
    },
    SAVE_GRID(ctx: ActionContext<GridState, null>) {
      const { rows, cols, grid } = ctx.state;
      saveToStorage(STORAGE_KEY, { rows, cols, grid });
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