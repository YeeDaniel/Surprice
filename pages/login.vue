<template>
  <div class="flex flex-col w-full h-full shadow-md bg-green">
    <!-- Logo + 標語 -->
    <div class="flex flex-col items-center h-[35%] justify-center">
      <img src="/logo.svg" alt="Logo" class="w-16 mb-2" />
      <p class="text-lg font-semibold text-white">歡迎使用找好康！</p>
    </div>

    <div class="h-[65%] bg-white px-6 rounded-tl-2xl rounded-tr-2xl border">
      <!-- 標題 -->
      <h2 class="my-6 text-center text-xl font-bold text-green">登入或註冊</h2>

      <!-- 帳號欄位 -->
      <div class="mb-4">
        <label class="block text-sm font-bold text-gray-700">帳號</label>
        <input
          v-model="email"
          type="email"
          placeholder="surprice@gmail.com"
          class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- 密碼欄位 -->
      <div class="mb-16">
        <label class="block text-sm font-bold text-gray-700">密碼</label>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="******"
          />
          <button
            type="button"
            class="absolute inset-y-0 right-2 flex items-center text-gray-400"
            @click="showPassword = !showPassword"
          >
            <img
              :src="showPassword ? '/eye-off.svg' : '/eye.svg'"
              class="h-5 w-5"
              alt="切換密碼顯示"
            />
          </button>
        </div>
        <p v-if="errorMessage" class="mt-1 text-xs text-red-500">
          {{ errorMessage }}
        </p>
      </div>

      <!-- 忘記密碼 -->
      <div class="mb-12 text-right text-xs">
        <NuxtLink to="/resetPassword" class="text-green hover:underline">
          忘記密碼？
        </NuxtLink>
      </div>

      <!-- 登入按鈕 -->
      <button
        @click="handleLogin"
        class="w-full rounded-full py-2 font-bold text-white hover:bg-green bg-green mb-12"
      >
        登入
      </button>

      <!-- 分隔線 -->
      <div
        class="my-4 flex items-center justify-center gap-2 text-sm text-gray-400"
      >
        <hr class="w-1/3 border-gray-300" />
        <p class="font-bold">或者</p>
        <hr class="w-1/3 border-gray-300" />
      </div>

      <!-- 第三方登入方式 -->
      <div class="flex justify-around text-center text-sm text-gray">
        <div class="flex flex-col items-center cursor-pointer">
          <img src="/phone.svg" class="w-6 h-6 mb-1" />
          <p class="font-bold">手機驗證碼</p>
        </div>
        <div class="flex flex-col items-center cursor-pointer">
          <img src="/google.svg" class="w-6 h-6 mb-1" />
          <p class="font-bold">Google</p>
        </div>
        <div class="flex flex-col items-center cursor-pointer">
          <img src="/facebook.svg" class="w-6 h-6 mb-1" />
          <p class="font-bold">FaceBook</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const errorMessage = ref("");

const accounts = [
  { email: "user@example.com", password: "123456", role: "user" },
  { email: "shop@example.com", password: "123456", role: "shop" },
];

const handleLogin = () => {
  const match = accounts.find(
    (acc) => acc.email === email.value && acc.password === password.value
  );

  if (!match) {
    // 若找不到帳號，導向尚未註冊頁面
    return navigateTo("/noAccount");
  }

  if (match.password === password.value) {
    errorMessage.value = "";

    // 成功登入導向不同頁面
    if (match.role === "user") {
      navigateTo("/search");
    } else if (match.role === "shop") {
      navigateTo("/info");
    }
  } else {
    errorMessage.value = "帳號或密碼錯誤";
  }
};
</script>
<style>
/* 隱藏 Chrome / Edge 內建密碼眼睛按鈕 */
input::-ms-reveal,
input::-ms-clear,
input::-webkit-credentials-auto-fill-button,
input::-webkit-clear-button {
  display: none !important;
}
</style>
