export class GridTile {
  row: number;
  col: number;

  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  color: string = '';
  outline: string = '';

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}

interface GridState {
  width: number;
  height: number,
  cols: number,
  rows: number,
  grid: GridTile[][],
  selected: GridTile | null,
}

function initialState(): GridState {
  return {
    width: 400,
    height: 400,
    cols: 0,
    rows: 0,
    grid: [],
    selected: null,
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
    SET_SELECTED(state: GridState, payload: { rowIndex: number, colIndex: number }) {
      const { rowIndex, colIndex } = payload;
      if (state.selected) {
        state.selected.color = '';
      }
      state.selected = state.grid[rowIndex][colIndex];
      state.selected.color = '#44a';
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
}