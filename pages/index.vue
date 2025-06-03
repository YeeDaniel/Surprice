<template>
  <div class="flex items-center justify-center">
    <div
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
setTimeout(() => {
  navigateTo("/login");
}, 2000); // 延遲2秒後跳轉

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

const toInfoPage = async () => {
  navigateTo("/info");
};
</script>

<style scoped></style>
