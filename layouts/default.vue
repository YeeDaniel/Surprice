<template>
  <div class="flex h-screen flex-col">
    <Navbar
      v-if="
        $route.path !== '/' &&
        $route.path !== '/login' &&
        $route.path !== '/noAccount' &&
        $route.path !== '/verify' &&
        $route.path !== '/resetPassword'
      "
    />
    <NuxtPage />
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped></style>
