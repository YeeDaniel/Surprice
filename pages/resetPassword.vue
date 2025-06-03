<template>
  <div class="flex flex-col w-full h-full shadow-md bg-green">
    <!-- Logo + 標語 -->
    <div class="flex flex-col items-center h-[35%] justify-center">
      <img src="/logo.svg" alt="Logo" class="w-16 mb-2" />
      <p class="text-lg font-semibold text-white">歡迎使用找好康！</p>
    </div>

    <div class="h-[65%] bg-white px-6 rounded-tl-2xl rounded-tr-2xl border">
      <!-- 標題 -->
      <h2 class="my-6 text-center text-xl font-bold text-green">重設密碼</h2>

      <!-- 帳號欄位 -->
      <div class="mb-4">
        <label class="block text-sm font-bold text-gray-700">帳號</label>
        <input
          v-model="email"
          type="email"
          placeholder="surprice@gmail.com"
          class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <p v-if="emailError" class="mt-1 text-xs text-red-500">
          {{ emailError }}
        </p>
      </div>

      <!-- 新密碼欄位 -->
      <div class="mb-4">
        <label class="block text-sm font-bold text-gray-700"
          >新密碼(6-16半形英數字，不含全形字元與符號)</label
        >
        <div class="relative">
          <input
            v-model="newPassword"
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
        <p v-if="passwordError" class="mt-1 text-xs text-red-500">
          {{ passwordError }}
        </p>
      </div>

      <!-- 確認密碼欄位 -->
      <div class="mb-12">
        <label class="block text-sm font-bold text-gray-700">確認密碼</label>
        <div class="relative">
          <input
            v-model="confirmPassword"
            :type="showPassword ? 'text' : 'password'"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="******"
          />
        </div>
        <p v-if="confirmError" class="mt-1 text-xs text-red-500">
          {{ confirmError }}
        </p>
      </div>

      <!-- 確認按鈕 -->
      <button
        @click="submitReset"
        class="w-full rounded-full bg-green-500 py-2 font-bold text-white hover:bg-green bg-green"
      >
        確 認
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);

const emailError = ref("");
const passwordError = ref("");
const confirmError = ref("");

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePassword = (pw) => /^[A-Za-z0-9]{6,16}$/.test(pw);

const submitReset = () => {
  emailError.value = "";
  passwordError.value = "";
  confirmError.value = "";

  if (!validateEmail(email.value)) {
    emailError.value = "請輸入正確電子郵件地址";
  }
  if (!validatePassword(newPassword.value)) {
    passwordError.value = "不能包含符號";
  }
  if (newPassword.value !== confirmPassword.value) {
    confirmError.value = "輸入錯誤";
  }

  if (!emailError.value && !passwordError.value && !confirmError.value) {
    // 可改為發送 API 請求
    alert("密碼已重設成功！");
    navigateTo("/login");
  }
};
</script>

<style>
input::-ms-reveal,
input::-ms-clear,
input::-webkit-credentials-auto-fill-button,
input::-webkit-clear-button {
  display: none !important;
}
</style>
