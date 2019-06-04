<template>
  <div>
    <canvas ref="tile-maker-canvas"></canvas>
    <t-m-tile-component></t-m-tile-component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'
import { DrawCB } from './types'

import TMTileComponent from './tm-tile-component.vue'
@Component({
  components: {
    TMTileComponent,
  }
})
export default class TMCanvas extends Vue {
  // the fixed px value of height and width of the canvas element --- it will serve as a frame to render
  // the tile component being designed --- the frame will support multiple zoom levels
  readonly frameSize = 400 

  ctx: CanvasRenderingContext2D | null = null

  // @Provide 

  // @Provide('_draw') private _draw: Function = this.draw
  // // @Provide('_draw') _draw: (cb: DrawCB) => void = this.draw
  // // this.draw!: (cb: DrawCB) => void

  draw(cb: DrawCB): void {
    if (!this.ctx) return
    this.ctx.beginPath()
    cb(this.ctx)
    this.ctx.closePath()
  }

  // Lifecycle hooks
  mounted() {
    const canvas = this.$refs['tile-maker-canvas'] as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
  }
  
}
</script>
