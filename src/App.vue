<script setup lang="ts">
import Navigation from './components/Navigation.vue'
import ToastContainer from './components/ToastContainer.vue'
</script>

<template>
  <Navigation />
  <RouterView />
  <ToastContainer />
  
</template>

<style scoped>
</style>
