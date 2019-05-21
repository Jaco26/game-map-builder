import { MutationTree, ActionTree } from 'vuex';
import { MapComponent, MapComponentsState } from './types'

const initialState = (): MapComponentsState => ({
  mapComponents: [],
});

const mutations: MutationTree<MapComponentsState> = {
  saveMapComponent(state: MapComponentsState, payload: MapComponent) {
    state.mapComponents.push(payload);
  },
};


export default {
  state: initialState(),
  mutations,
}