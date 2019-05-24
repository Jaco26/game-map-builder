export class GridTile {
  // row: number;
  // col: number;

  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  // constructor(row: number, col: number) {
  //   this.row = row;
  //   this.col = col;
  // }
}

interface GridState {
  width: number;
  height: number,
  cols: number,
  rows: number,
  grid: GridTile[][],
}

function initialState(): GridState {
  return {
    width: 400,
    height: 400,
    cols: 0,
    rows: 0,
    grid: [],
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
          row.push(new GridTile());
        }
        state.grid.push(row);
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
  }
}