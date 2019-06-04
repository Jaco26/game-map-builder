

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue';

@Component
export default class TMTileComponent extends Vue {

  // @Prop 

  readonly minZoom = 1
  readonly maxZoom = 10
  hello = 'hello'

  _zoomLevel = 10
  get zoomLevel(): number {
    return this._zoomLevel
  }
  set zoomLevel(newVal) {
    if (newVal > 0 && newVal < 11) this._zoomLevel = newVal
  }

  // @Inject('_draw') _draw!: any
  // // _draw!: (cb: (ctx: CanvasRenderingContext2D) => void) => void

  render(c: CreateElement) {
    // console.log(this._draw)
    return c('div', ['hi'])
  }
}
</script>
