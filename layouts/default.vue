<template>
  <div class="flex h-screen flex-col">
    <Navbar v-if="$route.path !== '/'" />
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped></style>
