<template>
  <div>
    <t-m-canvas>
      <TMTileComponent />
    </t-m-canvas>
  </div>
</template>

<script>
import TMCanvas from '@/components/tile-maker/tm-canvas'
import TMTileComponent from '@/components/tile-maker/tm-tile-component'
export default {
  components: {
    TMCanvas,
    TMTileComponent,
  },
};
</script>

