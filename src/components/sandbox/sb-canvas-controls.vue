<template>
  <v-toolbar flat>
    <v-autocomplete
      hide-details
      label="Choose selected tile's color"
      :disabled="!selectedTile"
      v-model="color"
      :items="clrOptions"
    ></v-autocomplete>

    <v-btn @click="$emit('update:makeNewGrid', !makeNewGrid)">New Grid</v-btn>

    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">Load Grid</v-btn>
      </template>
    </v-menu>
    <!-- <v-btn @click="SAVE_GRID">Save Grid</v-btn> -->

    <v-spacer></v-spacer>
    <v-slider 
      min="1"
      max="10"
      ticks
      :tick-labels="[1,2,3,4,5,6,7,8,9,10]"
      v-model="scale"
    ></v-slider>    
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Getter, Mutation, namespace } from 'vuex-class'

import { GridTile } from '@/store/modules/grid/types';

const gridMod = namespace('grid');

@Component
export default class SBCanvasControls extends Vue {
  // Props
  @Prop(Boolean) makeNewGrid!: boolean;

  // Data
  scale = 5;
  clrOptions = ['blue', 'green', 'red', 'yellow', 'gray'];
  newGridArgs = {
    rows: 20,
    cols: 12,
  };


  // STORE
  // getters
  @gridMod.Getter selectedTile!: GridTile | null;
  // mutations
  @gridMod.Mutation SET_TILE_COLOR: any;
  // actions
  @gridMod.Action GENERATE_NEW_GRID: any;
  @gridMod.Action SAVE_GRID: any;

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
