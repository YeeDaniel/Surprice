<template>
  <div class="flex items-center justify-center">
    <div
      class="flex h-full w-full items-center justify-between bg-[#46D1FE] px-4 pt-10 sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <img
        class="scale-50 cursor-pointer"
        src="/hamburger.png"
        alt="hamburger"
      />
      <img
        class="scale-50 cursor-pointer"
        @click="toHomePage"
        src="/printerChain.png"
        alt="printerChain"
      />
      <img
        class="scale-50 cursor-pointer"
        src="/question.png"
        alt="hamburger"
      />
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
