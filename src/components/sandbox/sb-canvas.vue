<template>
  <div class="my-canvas-wrapper">
    <canvas 
      ref="my-canvas"
      :height="height"
      :width="width"
    ></canvas>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import { State, Mutation, namespace } from 'vuex-class';
import { MutationMethod } from 'vuex';
import { GridTile } from '@/store/grid'

const gridModule = namespace('grid');

@Component
export default class SbCanvas extends Vue {
  // constructor() {
  //   super();
  //   console.log(this)
  // }
  isMousedown: boolean = false;

  @gridModule.State grid: [];

  @gridModule.State width: number;
  @gridModule.State height: number;

  @gridModule.State cols: number;
  @gridModule.State rows: number;
  @gridModule.State selected: GridTile;

  @Watch('selected')
  onSelectedChange(newVal: GridTile, oldVal: GridTile | null) {
    if (oldVal) console.log(oldVal.color)
    this.clearRect();
    this.drawGrid()
  }

  @gridModule.Mutation GENERATE_GRID: any
  @gridModule.Mutation SIZE_TILES: any
  @gridModule.Mutation SET_SELECTED: any;

  // getTile(e: MouseEvent) {
  //   const vm = this;
  //   const rowIndex = Math.floor(e.offsetY / (vm.height / vm.rows));
  //   const colIndex = Math.floor(e.offsetX / (vm.width / vm.cols));
  //   vm.SET_SELECTED({ colIndex, rowIndex });
  // }

  clearRect() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw(cb: Function) {
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

  mounted() {
    const c: any = this.$refs['my-canvas']
    this.GENERATE_GRID({ rows: 10, cols: 10 })
    this.SIZE_TILES();
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
