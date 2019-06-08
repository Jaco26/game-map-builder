<template>
  <v-flex>
    <v-layout justify-center align-center>
      <v-flex @click="onClick" @mousemove="onOverlayMousemove">
        <canvas ref="tile-maker"></canvas>
        <canvas ref="overlay"></canvas>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { DrawCB } from './types'
import { GridTile } from '@/store/modules/grid/types';

// import TMTileComponent from './tm-tile-component.vue'
@Component
export default class TMCanvas extends Vue {
  @Prop(Function) selectedBrush!: (ctx: CanvasRenderingContext2D, tile: GridTile) => void | null

  // the fixed px value of height and width of the canvas element --- it will serve as a frame to render
  // the tile component being designed --- the frame will support multiple zoom levels
  readonly frameSize = 400 
  mouseIsDown = false
  ctx: CanvasRenderingContext2D | null = null
  overlayCtx: CanvasRenderingContext2D | null = null

  nRows = 4
  nCols = 4
  hoveredTile!: GridTile
  tileRegions: GridTile[][] = []


  // Methods
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
    const tile = this.findTile(e.offsetX, e.offsetY)
    if (tile !== this.hoveredTile) {
      if (this.hoveredTile) {
        this.drawOverlay(ctx => {
          const { x, y, width, height } = this.hoveredTile 
          ctx.clearRect(x - 1, y - 1, width + 2, height + 2)
        })
      }
      this.hoveredTile = tile
      this.drawOverlay(ctx => {
        const { x, y, width, height } = this.hoveredTile 
        ctx.strokeRect(x, y, width, height)
      })
    }
    
  }
  onClick(e: MouseEvent) {
    if (this.selectedBrush) {
      const tile = this.findTile(e.offsetX, e.offsetY)
      this.draw(ctx => this.selectedBrush(ctx, tile))
    }
  }
  

  
  findTile(x: number, y: number): GridTile {
    let rowIndex = Math.floor((y + 2) / (this.frameSize / this.nRows))
    let colIndex = Math.floor((x + 2) / (this.frameSize / this.nCols))
    
    rowIndex = rowIndex < this.nRows ? rowIndex : this.nRows - 1
    colIndex = colIndex < this.nCols ? colIndex : this.nCols - 1

    return this.tileRegions[rowIndex][colIndex]
  }

  // Lifecycle hooks
  mounted() {
    const canvas = this.$refs['tile-maker'] as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    canvas.width = this.frameSize
    canvas.height = this.frameSize
    canvas.style.backgroundColor = 'chartreuse'

    const overlay = this.$refs['overlay'] as HTMLCanvasElement
    this.overlayCtx = overlay.getContext('2d')
    overlay.width = this.frameSize
    overlay.height = this.frameSize

    const tileWidth = this.frameSize / this.nCols
    const tileHeight = this.frameSize / this.nRows

    for (let r = 0; r < this.nRows; r++) {
      const row: GridTile[] = []
      for (let c = 0; c < this.nCols; c++) {
        const tile = new GridTile(r, c)
        tile.width = tileWidth
        tile.height = tileHeight
        tile.x = c * tileWidth
        tile.y = r * tileHeight
        row.push(tile)
      }
      this.tileRegions.push(row)
    }
  }
  
}
</script>

<style scoped>
canvas {
  border: 1px solid #333;
  position: absolute;
  top: 0;
  left: 0
}
</style>

