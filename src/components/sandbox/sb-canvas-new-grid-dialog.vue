<template>
  <v-dialog :value="show">
    
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SBCanvasNewGridDialog extends Vue {
  @Prop(Boolean) show!: boolean;
}
</script>
