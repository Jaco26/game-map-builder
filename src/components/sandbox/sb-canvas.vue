<template>
  <div class="my-canvas-wrapper">
    <canvas 
      ref="my-canvas"
      class="cvs-cls"
      :height="height"
      :width="width"
      @mousedown="isMousedown = true"
      @mouseup="isMousedown = false"
      v-on="isMousedown ? { mousemove: onMousemove } : null"
    ></canvas>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Provide } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class';
import { MutationMethod } from 'vuex';
import { GridTile } from '@/store/grid'

const gridModule = namespace('grid');

@Component
export default class SbCanvas extends Vue {
  isMousedown: boolean = false;

  @gridModule.State grid: [];

  @gridModule.State width: number;
  @gridModule.State height: number;

  @gridModule.State cols: number;
  @gridModule.State rows: number;

  @gridModule.Mutation GENERATE_GRID: any
  @gridModule.Mutation SIZE_TILES: any

  draw(cb: Function) {
    if (!this.ctx) return;
    this.ctx.beginPath();
    cb(this.ctx);
    this.ctx.closePath();
  }

  sizeTiles() {
    

  }

  drawGrid() {
    
    // this.grid.forEach((tile: GridTile, i) => {
    //   tile.width = width;
    //   tile.height = height;
    //   tile.x = 
    //   // tile.y = tile.height * (i % this.height);
    //   console.log(tile.x, tile.y)
    // });
  }

  mounted() {
    const c: any = this.$refs['my-canvas']
    c.width = 600;
    c.height = 600;
    this.grid;
    this.GENERATE_GRID({ rows: 10, cols: 10 })
    this.drawGrid();
  }

  get ctx(): CanvasRenderingContext2D | null {
    const canvas: any = this.$refs['my-canvas'];
    if (canvas) return canvas.getContext('2d');
    return null;
  }

  onMousemove(e: any) {
    this.draw((ctx: CanvasRenderingContext2D) => {
      ctx.strokeRect(e.offsetX, e.offsetY, 10, 10);
    });
  }

};
</script>

<style scoped>
.cvs-cls {
  background-color: aqua;
  /* height: 100%; */
}
</style>
