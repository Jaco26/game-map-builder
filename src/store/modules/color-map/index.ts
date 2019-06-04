import { ColorMapState, ColorItem } from './types' 

function genClr(label: string, hex: string): { label: string, hex: string } {
  if (!hex.startsWith('#')) hex = `#${hex}`
  return { label, hex };
}

function initialState(): ColorMapState {
  return {
    colors: [
      genClr('red', 'aa554488'),
      genClr('green', '44aa5588'),
      genClr('blue', '4455aa88'),
      genClr('gray', '777')
    ],
  }
}

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    colorsIndexedByLabel(state: ColorMapState): {[key: string]: string} {
      return state.colors.reduce((acc: {[key: string]: string}, b) => {
        acc[b.label] = b.hex;
        return acc;
      }, {});
    }
  }
}