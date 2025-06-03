<template>
  <div class="flex flex-col w-full h-full shadow-md bg-green">
    <!-- Logo + 標語 -->
    <div class="flex flex-col items-center h-[35%] justify-center">
      <img src="/logo.svg" alt="Logo" class="w-16 mb-2" />
      <p class="text-lg font-semibold text-white">歡迎使用找好康！</p>
    </div>

    <div class="h-[65%] bg-white px-6 rounded-tl-2xl rounded-tr-2xl border">
      <!-- 標題 -->
      <h2 class="my-6 text-center text-xl font-bold text-green">驗證</h2>

      <!-- 驗證碼欄位 -->
      <div class="mb-4">
        <label class="block text-sm font-bold text-gray-700">驗證碼</label>
        <div class="relative">
          <input
            v-model="code"
            type="text"
            placeholder="已傳送驗證碼"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <span
            class="absolute inset-y-0 right-3 flex items-center text-gray-400 text-sm"
          >
            {{ timer }}s
          </span>
        </div>
        <p v-if="errorMessage" class="mt-1 text-xs text-red-500">
          {{ errorMessage }}
        </p>
      </div>

      <!-- 沒收到驗證碼 -->
      <div class="mb-6 text-right text-xs">
        <button class="text-green hover:underline" @click="resendCode">
          未收到驗證碼？重新傳送
        </button>
      </div>

      <!-- 繼續按鈕 -->
      <button
        @click="handleVerify"
        class="w-full rounded-full bg-green-500 py-2 font-bold text-white hover:bg-green bg-green"
      >
        繼續
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();

const code = ref("");
const correctCode = "123456"; // 範例驗證碼，可從 props 或 API 帶入
const errorMessage = ref("");
const timer = ref(60);
let countdown;

// 取出從 noAccount 傳來的資料
const email = route.query.email;
const password = route.query.password;
const role = route.query.role;

const handleVerify = () => {
  if (code.value === correctCode) {
    if (role === "user") {
      navigateTo("/search");
    } else if (role === "shop") {
      navigateTo("/info");
    } else {
      errorMessage.value = "無效的角色";
    }
  } else {
    errorMessage.value = "驗證碼不符";
  }
};

const startTimer = () => {
  countdown = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(countdown);
    }
  }, 1000);
};

const resendCode = () => {
  timer.value = 60;
  clearInterval(countdown);
  startTimer();
  // 可以放入重新發送驗證碼邏輯
};

onMounted(() => {
  startTimer();
});
</script>

<style>
input::-ms-reveal,
input::-ms-clear,
input::-webkit-credentials-auto-fill-button,
input::-webkit-clear-button {
  display: none !important;
}
</style>
