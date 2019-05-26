import { GridTile } from '@/store/modules/grid/types';

export interface SavedGrid {
  rows: number,
  cols: number,
  grid: GridTile[][],
}

export interface GridListState {
  list: SavedGrid[],
}