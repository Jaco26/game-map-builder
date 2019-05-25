import { GridTile, GridState } from './types'

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
    GENERATE_GRID(state: GridState, payload: { rows: number, cols: number }) {
      const { rows, cols } = payload;
      state.rows = rows;
      state.cols = cols;
      for (let r = 0; r < rows; r++) {
        const row: GridTile[] = [];
        for (let c = 0; c < cols; c++) {
          row.push(new GridTile(r, c));
        }
        state.grid.push(row);
      }
    },
    SET_SELECTED(state: GridState, payload: { rowIndex: number | null, colIndex: number | null }) {
      const { rowIndex, colIndex } = payload;
      state.selected.row = rowIndex;
      state.selected.col = colIndex;
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
  getters: {
    selectedTile(state: GridState): GridTile | null {
      if (state.selected.row) {
        return state.grid[state.selected.row][state.selected.col!];
      }
      return null
    }
  }
}