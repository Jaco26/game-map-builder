<template>
  <div class="my-canvas-wrapper">
    <canvas 
      ref="my-canvas"
      :height="height"
      :width="width"
      @click="getTile"
    ></canvas>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { GridTile } from '@/store/modules/grid/types'
import { State, Mutation, namespace } from 'vuex-class'
import { Component, Watch } from 'vue-property-decorator'
const gridMod = namespace('grid')
@Component
export default class SBCanvas extends Vue {

  // VUEX
  // state
  @gridMod.State grid!: [];
  @gridMod.State width!: number;
  @gridMod.State height!: number;
  @gridMod.State cols!: number;
  @gridMod.State rows!: number;
  @gridMod.State selected!: GridTile;
  // mutations
  @gridMod.Mutation GENERATE_GRID: any
  @gridMod.Mutation SIZE_TILES: any
  @gridMod.Mutation SET_SELECTED: any;

  // METHODS
  getTile(e: MouseEvent): void {
    const vm = this;
    const rowIndex = Math.floor(e.offsetY / (vm.height / vm.rows));
    const colIndex = Math.floor(e.offsetX / (vm.width / vm.cols));
    vm.SET_SELECTED({ colIndex, rowIndex });
  }
  clearRect(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  draw(cb: Function): void {
    if (!this.ctx) return;
    this.ctx.beginPath();
    cb(this.ctx);
    this.ctx.closePath();
  }
  drawGrid() {
    this.grid.forEach((row: GridTile[]) => {
      row.forEach((tile: GridTile) => {
        this.draw((ctx: CanvasRenderingContext2D) => {
          ctx.rect(tile.x, tile.y, tile.width, tile.height);
          ctx.fillStyle = tile.color || 'white';
          ctx.fill();
          ctx.stroke();
        });
      });
    });
  }
  
  // COMPUTED
  get ctx(): CanvasRenderingContext2D | null {
    const canvas: any = this.$refs['my-canvas'];
    if (canvas) return canvas.getContext('2d');
    return null;
  }

  // WATCH
  @Watch('selected')
  onSelectedChange(newVal: GridTile, oldVal: GridTile | null) {
    this.clearRect();
    this.drawGrid()
  }

  // LIFECYCLE
  mounted() {
    const c: any = this.$refs['my-canvas']
    this.GENERATE_GRID({ rows: 10, cols: 10 })
    this.SIZE_TILES();
    this.drawGrid();
  }
}
</script>
