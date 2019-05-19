<template>
  <div>
    <s-b-canvas-controls></s-b-canvas-controls>
    <s-b-canvas-parent></s-b-canvas-parent>
  </div> 
</template>

<script>
import SBCanvasParent from '@/components/sandbox/sb-canvas.vue'
import SBCanvasControls from '@/components/sandbox/sb-canvas-controls.vue'
export default {
  components: {
    SBCanvasParent,
    SBCanvasControls
  },
};
</script>
