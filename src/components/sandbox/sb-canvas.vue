<template>
  <div class="my-canvas-wrapper">
    <canvas 
      ref="my-canvas"
      class="cvs-cls"
      @mousedown="isMousedown = true"
      @mouseup="isMousedown = false"
      v-on="isMousedown ? { mousemove: onMousemove } : null"
    ></canvas>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class SbCanvas extends Vue {
  height: number = 400;
  width: number = 400;
  isMousedown: boolean = false;

  provide(): Object {
    return {
      ctx: this.ctx,
      draw: this._draw,
    };
  }

  _draw(cb: Function) {
    if (!this.ctx) return;
    this.ctx.beginPath();
    cb(this.ctx);
    this.ctx.closePath();
  }

  mounted() {
    const c: any = this.$refs['my-canvas']
    c.width = 600;
    c.height = 600;
  }

  get ctx(): CanvasRenderingContext2D | null {
    const canvas: any = this.$refs['my-canvas'];
    if (canvas) return canvas.getContext('2d');
    return null;
  }

  onMousemove(e: any) {
    this._draw((ctx: CanvasRenderingContext2D) => {
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
