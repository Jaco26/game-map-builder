export class GridTile {
  row: number;
  col: number;

  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  color: string = '';

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}

export interface GridState {
  width: number;
  height: number,
  cols: number,
  rows: number,
  grid: GridTile[][],
  selected: {
    row: number | null,
    col: number | null
  },
}