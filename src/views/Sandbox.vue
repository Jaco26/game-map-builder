<template>
  <div>
    <!-- <s-b-canvas-controls></s-b-canvas-controls> -->
    <SBCanvasControls />
    <s-b-canvas-parent>
      <s-b-canvas-grid></s-b-canvas-grid>
    </s-b-canvas-parent>
  </div> 
</template>

<script>
import SBCanvasParent from '@/components/sandbox/sb-canvas.vue'
import SBCanvasControls from '@/components/sandbox/sb-canvas-controls.vue'
import SBCanvasGrid from '@/components/sandbox/sb-canvas-grid.vue'
export default {
  components: {
    SBCanvasParent,
    SBCanvasControls,
    SBCanvasGrid,
  },
};
</script>
