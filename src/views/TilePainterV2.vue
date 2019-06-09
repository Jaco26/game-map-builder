<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Controls</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="onCyclePaths">Cycle Paths</v-btn>
    </v-toolbar>
    <v-container>
      <v-layout justify-center>
        <canvas ref="overlay"></canvas>
        <canvas ref="canvas" @click="onCanvasClick"></canvas>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

interface Point {
  x: number
  y: number
}

interface Shape {
  /** stores locations on the canvas clicked by the user*/
  points: Point[]
  /** the Path2D instance generated with the points */
  path: Path2D
  fillStyle: string
  strokeStyle: string
}

@Component
export default class TilePainterV2 extends Vue {
  // Data
  width = 400
  height = 400
  ctx: CanvasRenderingContext2D | null = null
  overlayCtx: CanvasRenderingContext2D | null = null
  
  currentShape: Shape = {
    points: [],
    path: new Path2D(),
    fillStyle: 'blue',
    strokeStyle: ''
  }

  // Watchers
  @Watch('currentShape.points')
  onPointsChange(newVal: Point[]) {
    let { path, points } = this.currentShape
    // path.moveTo(points[0].x, points[0].y)
    // points.slice(1).forEach(point => {
    //   path.lineTo(point.x, point.y)
    // })
    points.forEach(point => {
      path.lineTo(point.x, point.y)
    })
    path.closePath()
    this.renderShapes()
  }

  shapes: Shape[] = []

  // Methods
  renderShapes() {
    const start = Date.now()
    const allShapes = [...this.shapes, this.currentShape]
    this.draw(ctx => {
      ctx.clearRect(0, 0, this.width, this.height)
      allShapes.forEach(shape => {
        ctx.strokeStyle = shape.strokeStyle
        ctx.fillStyle = shape.fillStyle
        ctx.fill(shape.path, 'nonzero')
      })
    })
    this.drawOverlay(ctx => {
      allShapes.forEach(shape => {
        shape.points.forEach(({ x, y }) => ctx.strokeRect(x - 2, y - 2, 4, 4))
      })
    })
    console.log('renderShapes duration: ', Date.now() - start)
  }
  /** 
   * highlight a given path and apply fill to it...
   */
  onCyclePaths() {

  }

  onCanvasClick(e: MouseEvent) {
    this.currentShape.points.push({
      x: e.offsetX,
      y: e.offsetY,
    })
  }

  draw(cb: (ctx: CanvasRenderingContext2D) => void) {
    if (!this.ctx) return
    this.ctx.beginPath()
    cb(this.ctx)
    this.ctx.closePath()
  }

  drawOverlay(cb: (ctx: CanvasRenderingContext2D) => void) {
    if (!this.overlayCtx) return
    this.overlayCtx.beginPath()
    cb(this.overlayCtx)
    this.overlayCtx.closePath()
  }



  // Lifecycle
  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    canvas.width = this.width
    canvas.height = this.height
    canvas.style.border = '1px black solid'

    const overlay = this.$refs.overlay as HTMLCanvasElement
    this.overlayCtx = overlay.getContext('2d')
    overlay.width = this.width
    overlay.height = this.height
  }
}
</script>

<style scoped>
canvas {
  position: absolute;
}
</style>
