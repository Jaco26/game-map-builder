
interface Rect {
  x: number,
  y: number,
  width: number,
  height: number
}

export interface MapComponent {
  zoomLevel: number,
  name: string,
  color: string,
  dimensions: Rect
}


export interface MapComponentsState {
  mapComponents: MapComponent[],
}
