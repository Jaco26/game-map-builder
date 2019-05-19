<template>
  <v-app>
    <AppNavbar app />
    <v-content>
      <v-container fluid>
        <v-layout justify-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppNavbar from '@/components/app/navbar'
export default {
  name: 'App',
  components: {
    AppNavbar,
  }
}
</script>
