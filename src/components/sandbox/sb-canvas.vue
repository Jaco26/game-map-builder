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
  selectedColor: string = 'chartreuse';

  // VUEX
  // state
  @gridMod.State grid!: [];
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
    const vm = this;
    const rowIndex = Math.floor(e.offsetY / (vm.height / vm.rows));
    const colIndex = Math.floor(e.offsetX / (vm.width / vm.cols));
    vm.SET_SELECTED({ colIndex, rowIndex });
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
  drawGrid() {
    this.grid.forEach((row: GridTile[]) => {
      row.forEach((tile: GridTile) => {
        this.draw((ctx: CanvasRenderingContext2D) => {
          ctx.strokeRect(tile.x, tile.y, tile.width, tile.height);
          // ctx.stroke();selectedTile
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
  @Watch('selectedTile')
  onSelectedChange(newVal: GridTile | null, oldVal: GridTile | null) {
    if (oldVal) {
      const { x, y, width, height } = oldVal;
      this.draw((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);
      });
    }
    if (newVal) {
      const { x, y, width, height } = newVal;
      this.draw((ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = this.selectedColor;
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.stroke();
      });
    }
  }

  // LIFECYCLE
  mounted() {
    const c: any = this.$refs['my-canvas']
    this.GENERATE_GRID({ rows: 12, cols: 10 })
    this.SIZE_TILES();
    this.drawGrid();

    this.draw((ctx: CanvasRenderingContext2D) => {
      ctx.moveTo(44, 300)
      ctx.lineTo(500, 200)
      ctx.stroke()
    })
  }
}
</script>
