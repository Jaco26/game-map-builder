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
import { State, Getter, Mutation, namespace } from 'vuex-class'
import { Component, Watch, Provide } from 'vue-property-decorator'
const gridMod = namespace('grid')

@Component
export default class SBCanvas extends Vue {

  // DATA
  clrNeutral: string = '#fafafa';
  clrOffwhite: string = '#f1f1f1';
  clrSelected: string = '#333';

  // STORE
  // state
  @gridMod.State grid!: GridTile[][];
  @gridMod.State width!: number;
  @gridMod.State height!: number;
  @gridMod.State cols!: number;
  @gridMod.State rows!: number;
  // getters
  @gridMod.Getter selectedTile!: GridTile | null;
  // mutations
  @gridMod.Mutation GENERATE_GRID: any
  @gridMod.Mutation SIZE_TILES: any
  @gridMod.Mutation SET_SELECTED: any;

  // METHODS
  getTile(e: MouseEvent): void {
    const rowIndex = Math.floor(e.offsetY / (this.height / this.rows));
    const colIndex = Math.floor(e.offsetX / (this.width / this.cols));
    this.SET_SELECTED({ colIndex, rowIndex });
  }
  clearRect(
    x: number = 0,
    y: number = 0, 
    width: number = this.width,
    height: number = this.height
  ): void {
    if (!this.ctx) return;
    this.ctx.clearRect(x, y, width, height);
  }
  draw(cb: Function): void {
    if (!this.ctx) return;
    this.ctx.beginPath();
    cb(this.ctx);
    this.ctx.closePath();
  }
  drawGrid(t?: GridTile) {
    this.grid.forEach((row: GridTile[]) => {
      row.forEach((tile: GridTile) => {
        this.draw((ctx: CanvasRenderingContext2D) => {
          ctx.fillStyle = tile.color || this.clrOffwhite;
          ctx.rect(tile.x, tile.y, tile.width, tile.height);
          ctx.fill();
          if (t === tile) {
            ctx.stroke();
          }
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
  @Watch('grid', { deep: true })
  onGridChange() {
    this.drawGrid();
  }
  @Watch('selectedTile', { deep: true })
  onSelectedChange(newVal: GridTile | null, oldVal: GridTile | null) {   
    if (newVal )this.drawGrid(newVal);
  }

  // LIFECYCLE
  mounted() {
    const c: any = this.$refs['my-canvas']
    this.GENERATE_GRID({ rows: 24, cols: 20 })
    this.SIZE_TILES();
    this.drawGrid();
  }
}
</script>
