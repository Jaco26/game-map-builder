<template>
  <v-flex>
    <v-layout>
      <v-toolbar>
        <v-btn @click="saveCanvasToImg">Save</v-btn>
      <v-flex sm6 md3>
        <v-select 
          hide-details
          :items="Object.keys(brushOptions)"
          v-model="selectedBrushName"
        ></v-select>
      </v-flex>
    </v-toolbar>
    </v-layout>
    <v-card>
      <v-card-text>
        <TMCanvas ref="canvas" :selectedBrush="selectedBrush" />
      </v-card-text>
    </v-card>
        
  </v-flex>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TMCanvas from '@/components/tile-maker/tm-canvas.vue'
import { GridTile } from '@/store/modules/grid/types';

type Ctx = CanvasRenderingContext2D

@Component<CreateTileComponent>({
  components: {
    TMCanvas,
  },
})
export default class CreateTileComponent extends Vue {
  selectedBrushName = 'mountain'

  

  brushOptions: { [key: string]: Function } = {
    mountain: (ctx: Ctx, { x, y, height, width }: GridTile) => {
      ctx.moveTo(x + 10, y + height - 10)
      ctx.lineTo(x + (width * 0.5), y + (height * 0.2))
      ctx.lineTo(x + (width * 0.9), y + (height * 0.9))
      ctx.fillStyle = 'gray'
      ctx.fill()
      ctx.strokeStyle = 'black'
      ctx.stroke()
      
    },
    forest: (ctx: Ctx, { x, y, height, width, row }: GridTile) => {
      const xOffset = row % 2 === 0 ? -(width * 0.15) : (width * 0.15)
      ctx.fillStyle = 'brown'
      ctx.fillRect(
        x + (width * 0.4) + xOffset,
        y + (height * 0.6),
        width * 0.2,
        height * 0.4
      )
      ctx.fillStyle = 'darkgreen'
      ctx.arc(
        x + (width * 0.5) + xOffset,
        y + (height * 0.3),
        height * 0.3,
        0,
        Math.PI * 2
      )
      ctx.fill()
    },
  }

  get selectedBrush() {
    return this.brushOptions[this.selectedBrushName]
  }

  saveCanvasToImg() {
    const toSave: HTMLCanvasElement = this.$refs.canvas.$refs['tile-maker'];
    const img = toSave.toDataURL('my-canvas/png').replace('my-canvas/png', 'my-canvas/octet-stream')
    const downloadLink = document.createElement('a')
    downloadLink.setAttribute('download', 'grid-tile.png')
    downloadLink.setAttribute('href', img)
    downloadLink.click()
  }

};
</script>

