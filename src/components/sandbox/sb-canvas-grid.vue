
<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator'
import { IRectangle } from '@/util/types'

@Component
export default class SBCanvasGrid extends Vue {
  @Inject('draw') draw!: Function

  render() {
    if (!this.draw) return;
    this.draw((ctx: CanvasRenderingContext2D) => {
      console.log(ctx)
      ctx.strokeRect(50, 50, 40, 40);
      ctx.strokeStyle = 'blue';
      ctx.arc(300, 300, 20, 0, Math.PI * 2);
      ctx.stroke();
    });
  }
}
</script>

