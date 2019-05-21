<template>
  <v-toolbar dense flat>
    <v-btn flat>HEllo</v-btn>
    <v-btn flat>Byebye</v-btn>
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
import { Component } from 'vue-property-decorator'

@Component
export default class SBCanvasControls extends Vue {
  scale: number = 5;
}
</script>
