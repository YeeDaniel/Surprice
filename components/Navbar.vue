<template>
  <div class="flex items-center justify-center">
    <div
      class="flex h-full w-full items-center justify-between bg-primary px-4 py-4 pt-10 sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <img class="cursor-pointer" src="/User.svg" alt="User" />
      <img
        class="cursor-pointer"
        @click="toHomePage"
        src="/NavbarText.svg"
        alt="NavbarText"
      />
      <img class="cursor-pointer" src="/Heart.svg" alt="Heart" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const toHomePage = () => {
  navigateTo("/");
};
</script>

<style scoped></style>
