<template>
  <v-flex>

    <SBCanvasNewGridDialog :makeNewGrid.sync="makeNewGrid" />

    <v-layout>
      <v-flex>
        <SBCanvasControls :makeNewGrid.sync="makeNewGrid" />
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

import SBCanvasNewGridDialog from '@/components/sandbox/sb-canvas-new-grid-dialog'
export default {
  components: {
    SBCanvas,
    SBCanvasControls,
    SBCanvasNewGridDialog,
  },
  data() {
    return {
      makeNewGrid: false,
    }
  }
};
</script>
