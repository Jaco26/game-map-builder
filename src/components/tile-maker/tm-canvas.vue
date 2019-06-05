<template>
  <v-flex>
    <canvas 
      style="border: 1px solid #333;" 
      ref="tile-maker-canvas"
    ></canvas>
    <canvas
      ref="overlay"
      @mousemove="onOverlayMousemove"
      @mouseleave="onOverlayMouseleave"
    ></canvas>
    <slot></slot>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'
import { DrawCB } from './types'

// import TMTileComponent from './tm-tile-component.vue'
@Component
export default class TMCanvas extends Vue {
  // the fixed px value of height and width of the canvas element --- it will serve as a frame to render
  // the tile component being designed --- the frame will support multiple zoom levels
  readonly frameSize = 400 

  ctx: CanvasRenderingContext2D | null = null
  overlayCtx: CanvasRenderingContext2D | null = null

  @Provide('draw') draw = this.draw;

  draw(cb: DrawCB): void {
    if (!this.ctx) return
    this.ctx.beginPath()
    cb(this.ctx)
    this.ctx.closePath()
  }

  drawOverlay(cb: DrawCB): void {
    if (!this.overlayCtx) return
    this.overlayCtx.beginPath()
    cb(this.overlayCtx)
    this.overlayCtx.closePath()
  }

  onOverlayMousemove(e: MouseEvent) {
    this.drawOverlay((ctx: CanvasRenderingContext2D) => {
      const x = e.offsetX
      const y = e.offsetY
      ctx.clearRect(0, 0, this.frameSize, this.frameSize);
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fillStyle = '#2f28'
      ctx.fill()
    })
  }

  onOverlayMouseleave() {
    this.drawOverlay((ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, this.frameSize, this.frameSize);
    })
  }

  // Lifecycle hooks
  mounted() {
    const canvas = this.$refs['tile-maker-canvas'] as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    canvas.width = this.frameSize
    canvas.height = this.frameSize

    // render the mouse brush scope helpers on this
    const overlayCanvas = this.$refs.overlay as HTMLCanvasElement
    this.overlayCtx = overlayCanvas.getContext('2d')
    overlayCanvas.width = this.frameSize
    overlayCanvas.height = this.frameSize
  }
  
}
</script>

<style scoped>
canvas {
  /* display: block; */
  position: absolute;
  top: 0;
  left: 0
}
</style>

