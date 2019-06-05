<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import { CreateElement } from 'vue';

@Component
export default class TMTileComponent extends Vue {

  readonly minZoom = 1
  readonly maxZoom = 10

  ZOOM_LEVEL = 10
  get zoomLevel(): number {
    return this.ZOOM_LEVEL
  }
  set zoomLevel(newVal) {
    if (newVal > 0 && newVal < 11) this.ZOOM_LEVEL = newVal
  }

  @Inject() draw!: (cb: (ctx: CanvasRenderingContext2D) => void) => void


  render() {
    // this.draw(ctx => {
    //   ctx.moveTo(40, 60);
    //   ctx.lineTo(300,340)
    //   ctx.stroke()
    // })
  }
}
</script>
