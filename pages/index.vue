<template>
  <div class="flex items-center justify-center">
    <div
      :class="[
        'transition-opacity duration-500',
        showPage ? 'opacity-100' : 'opacity-0',
      ]"
      class="flex h-screen w-full flex-col items-center justify-center bg-primary sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <div class="flex flex-col h-full items-center justify-center">
        <img class="my-8" src="/logo.svg" alt="Surprice" />
        <img src="/logoText.svg" alt="Surprice" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig().public.apiBase;
import { ref } from "vue";

const showPage = ref(true);

// 等 2 秒後開始淡出
setTimeout(() => {
  showPage.value = false; // 觸發淡出（opacity 從 1 → 0）

  // 再等 0.5 秒，等動畫播完後跳轉頁面
  setTimeout(() => {
    navigateTo("/login");
  }, 150);
}, 2000);

const toWaitPage = async () => {
  // try {
  //   const response = await fetch(`${config}/basic/token/status`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   const data = await response.json();
  //   console.log("回傳資料：", data);
  //   if (data.is_valid === false) {
  //     window.open(data.auth_url, "_blank");
  //   } else {
  //     navigateTo("/new");
  //   }
  // } catch (error) {
  //   console.error("發送失敗：", error);
  // }
  navigateTo("/search");
};
</script>

<style scoped>
.fade-out {
  transition: opacity 0.5s ease;
}
.fade-out[v-cloak],
.fade-out[style*="display: none"] {
  opacity: 0;
}
</style>
