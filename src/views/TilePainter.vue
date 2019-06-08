<template>
  <div>
    <v-toolbar>
      <v-btn flat @click="onNewStroke" :color="currentStroke.length ? 'primary' : ''" :disabled="!currentStroke.length">
        New Path
      </v-btn>
      <v-btn flat @click="onUndo">Undo</v-btn>
      <v-spacer></v-spacer>
      <v-btn depressed @click="onFill">Fill</v-btn>
      <input type="color" v-model="fillStyle">
    </v-toolbar>
    <v-layout justify-center>
      <canvas ref="overlay"></canvas>
      <canvas
        ref="canvas"
        @click="onCanvasClick"
      ></canvas>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

interface DrawCB {
  (ctx: CanvasRenderingContext2D): void
}

interface Point {
  x: number
  y: number
}

@Component
export default class TilePainter extends Vue {
  height = 400
  width = 400
  mouseIsDown = false
  ctx: CanvasRenderingContext2D | null = null
  overlayCtx: CanvasRenderingContext2D | null = null

  fillStyle = '#ffffff'

  strokes: Point[][] = []
  currentStroke: Point[] = []

  paths: { fillStyle: string, path: Path2D }[] = []

  get allStrokes(): Point[][] {
    return [...this.strokes, this.currentStroke]
  }

  @Watch('allStrokes')
  onAllStrokesChange(newVal: Point[][]) {
    this.draw(ctx => {
      ctx.clearRect(0, 0, this.width, this.height)
      newVal.forEach(stroke => {
        stroke.forEach((point, i, arr) => {
          if (i > 0) {
            const prevPoint = arr[i - 1]
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(prevPoint.x, prevPoint.y)
            ctx.stroke()
          }
        })
      })
      this.paths.forEach(path => {
        ctx.fillStyle = path.fillStyle
        ctx.fill(path.path, 'evenodd')
      })
    })
  }

  draw(cb: DrawCB): void {
    if (!this.ctx) return
    this.ctx.beginPath()
    cb(this.ctx)
    this.ctx.closePath()
  }

  makePath2D(stroke: Point[]): Path2D {
    let region = new Path2D()
    region.moveTo(stroke[0].x, stroke[0].y)
    stroke.slice(1).forEach(point => {
      region.lineTo(point.x, point.y)
    })
    region.closePath()
    return region
  }

  drawCurrentStroke(ctx: CanvasRenderingContext2D) {
    if (this.currentStroke.length) {
      this.currentStroke.forEach((point, i, arr) => {
        ctx.fillRect(point.x - 2, point.y - 2, 4, 4)
        if (i > 0) {
          const prevPoint = arr[i - 1]
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(prevPoint.x, prevPoint.y)
          ctx.stroke()
        }
      })
    }
  }

  onCanvasClick(e: MouseEvent) {
    this.currentStroke.push({
      x: e.offsetX,
      y: e.offsetY
    })
  }

  onNewStroke() {
    this.strokes.push(this.currentStroke)
    this.currentStroke = []
  }

  onUndo() {
    if (this.currentStroke.length) {
      this.currentStroke.pop()
    } else if (this.strokes.length) {
      const newCurrentStroke = this.strokes.pop()
      if (newCurrentStroke) this.currentStroke = newCurrentStroke
    }
  }

  onFill() {
    let stroke;
    if (this.currentStroke.length) stroke = this.currentStroke
    else if (this.strokes.length) stroke = this.strokes[this.strokes.length - 1]
    else return

    const path = this.makePath2D(stroke)
    this.paths.push({ fillStyle: this.fillStyle, path })
    this.draw(ctx => {
      ctx.fillStyle = this.fillStyle
      ctx.fill(path, 'evenodd')
    })
  }

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

<style lang="stylus" scoped>
canvas {
  position absolute
}
</style>
