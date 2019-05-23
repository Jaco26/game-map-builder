import { IRectangle } from '@/util/types'

export interface MapComponent {
  name: string,
  color: string,
  dimensions?: IRectangle
}


export interface MapComponentsState {
  mapComponents: MapComponent[],
}
