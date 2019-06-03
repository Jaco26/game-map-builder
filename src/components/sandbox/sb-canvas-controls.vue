<template>
  <v-toolbar flat extended>
    <v-toolbar-title>
      {{gridName}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="$emit('update:makeNewGrid', !makeNewGrid)">New Grid</v-btn>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">Load Grid</v-btn>
      </template>
      <v-list>
        <v-list-tile
          v-for="grid in gridList"
          :key="grid.id"
          @click="SELECT_GRID(grid.id)"
        >
          <v-list-tile-content>
            {{grid.name}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-menu>

    <template v-slot:extension>
      <v-autocomplete
        hide-details
        label="Choose selected tile's color"
        :disabled="!selectedTile"
        v-model="color"
        :items="colors"
        item-value="label"
        item-text="label"
      >
        <template v-slot:label="{ item }">
          {{item.label}}
        </template>
      </v-autocomplete>

    <v-spacer></v-spacer>
    <v-slider 
      min="1"
      max="10"
      ticks
      :tick-labels="[1,2,3,4,5,6,7,8,9,10]"
      v-model="scale"
    ></v-slider>   
    </template>
     
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter, State, Mutation, namespace } from 'vuex-class'

import { ColorItem } from '@/store/modules/color-map/types'
import { GridTile } from '@/store/modules/grid/types';
import { SavedGrid } from '@/store/modules/grid-list/types';

const colorMapMod = namespace('colorMap');
const gridMod = namespace('grid');
const gridListMod = namespace('gridList');

@Component
export default class SBCanvasControls extends Vue {
  // Props
  @Prop(Boolean) makeNewGrid!: boolean;

  // Data
  scale = 5;
  // newGridArgs = {
  //   rows: 12,
  //   cols: 12,
  // };


  // STORE
  // state
  @colorMapMod.State colors!: ColorItem[]
  @gridListMod.State('list') gridList!: SavedGrid[]
  @gridMod.State('name') gridName!: string
  // getters
  @gridMod.Getter selectedTile!: GridTile | null;
  // mutations
  @gridMod.Mutation SET_TILE_COLOR: any;
  // actions
  @gridMod.Action GENERATE_NEW_GRID: any;
  @gridMod.Action SAVE_GRID: any;
  @gridListMod.Action SELECT_GRID: any;

  get color(): string {
    if (this.selectedTile) return this.selectedTile.color;
    return '';
  }
  set color(val) {
    this.SET_TILE_COLOR(val);
    this.SAVE_GRID();
  }

}
</script>
