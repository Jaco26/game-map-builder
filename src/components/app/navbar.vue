<template>
  <v-toolbar>
    <v-toolbar-title>Canvas Map</v-toolbar-title>
      <v-spacer></v-spacer>
      <template v-for="r in routes">
        <v-btn 
          :key="r.text" 
          exact 
          flat 
          color="primary" 
          :to="r.to"
        >
          {{r.text}}
        </v-btn>
      </template>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      routes: [
        {
          to: { name: 'sandbox' },
          text: 'Sandbox',
        },
        {
          to: { name: 'create-tile' },
          text: 'Create Tile',
        },
      ],
    }
  }
});
</script>

