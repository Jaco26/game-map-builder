<template>
  <div>
    <SBCanvasControls />
    <SBCanvas />
  </div> 
</template>

<script>
import SBCanvas from '@/components/sandbox/sb-canvas.vue'
import SBCanvasControls from '@/components/sandbox/sb-canvas-controls.vue'
export default {
  components: {
    SBCanvas,
    SBCanvasControls,
  },
};
</script>
