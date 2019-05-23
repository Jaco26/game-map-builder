import { saveToStorage, retrieveFromStorage } from '@/util'
import { MapComponent, MapComponentsState } from './types'


const STORAGE_KEY = 'mapComponents';

const initialState = (): Object => ({
  mapComponents: [],
});

export default {
  state: initialState(),
  mutations: {
    SET_MAP_COMPONENTS(state: MapComponentsState, components: MapComponent[]) {
      state.mapComponents = components;
    },
  },
  actions: {
    async ADD_MAP_COMPONENT(ctx: any, payload: MapComponent) {
      await saveToStorage(STORAGE_KEY, payload);
      const componets = await retrieveFromStorage(STORAGE_KEY);
      if (componets) {
        ctx.commit('SET_MAP_COMPONENTS', componets)
      } else {
        console.log(`No components present for "${STORAGE_KEY}" in localStorage`);
      }
    }
  },
};
