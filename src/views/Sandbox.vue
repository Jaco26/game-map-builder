<template>
  <v-flex>
    <v-layout>
      <v-flex>
        <SBCanvasControls />
      </v-flex>
    </v-layout>
    
    <v-layout class="mt-4">
      <v-flex >
        <SBCanvas />
      </v-flex>
    </v-layout>
    
  </v-flex> 
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
