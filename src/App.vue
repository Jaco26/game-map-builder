<template>
  <v-app>
    <AppNavbar app />
    <v-content>
      <v-container fluid>
        <v-layout justify-center>
          <v-flex>
            <router-view></router-view>
          </v-flex>
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
