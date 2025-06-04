<template>
  <div class="flex flex-col w-full h-full shadow-md bg-green">
    <!-- Logo + 標語 -->
    <div class="flex flex-col items-center h-[35%] justify-center">
      <img src="/Logo.svg" alt="Logo" class="w-16 mb-2" />
      <p class="text-lg font-semibold text-white">歡迎使用找好康！</p>
    </div>

    <div
      class="h-[65%] bg-white px-6 rounded-tl-2xl rounded-tr-2xl border overflow-auto"
    >
      <!-- 標題 -->
      <h2 class="my-6 text-center text-xl font-bold text-green">
        尚未註冊帳號
      </h2>

      <!-- 帳號欄位 -->
      <div class="mb-3">
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

      <!-- 密碼欄位 -->
      <div class="mb-3">
        <label class="block text-sm font-bold text-gray-700">
          密碼 (6-16半形英數字，不含全形字元與符號)
        </label>
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="********"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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

      <!-- 使用模式 -->
      <div class="mb-6">
        <label class="block text-sm font-bold text-gray-700">使用模式</label>
        <select
          v-model="role"
          class="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option disabled value="">請選擇</option>
          <option value="user">惜食者（買家）</option>
          <option value="shop">商家</option>
        </select>
        <p v-if="roleError" class="mt-1 text-xs text-red-500">
          至少選擇一種模式
        </p>
      </div>

      <!-- 註冊按鈕 -->
      <button
        @click="handleRegister"
        class="w-full rounded-full py-2 font-bold text-white hover:bg-green mb-6 bg-green"
      >
        註冊
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");
const role = ref("");
const showPassword = ref(false);
const emailError = ref("");
const passwordError = ref("");
const roleError = ref("");

const validateEmail = (email) => /.+@.+\..+/.test(email);
const validatePassword = (pwd) => /^[a-zA-Z0-9]{6,16}$/.test(pwd);

const handleRegister = () => {
  emailError.value = "";
  passwordError.value = "";
  roleError.value = "";

  let valid = true;

  if (!validateEmail(email.value)) {
    emailError.value = "請輸入正確電子郵件地址";
    valid = false;
  }
  if (!validatePassword(password.value)) {
    passwordError.value = "密碼不能包含符號";
    valid = false;
  }
  if (!role.value) {
    roleError.value = "至少選擇一種模式";
    valid = false;
  }

  if (valid) {
    navigateTo({
      path: "/verify",
      query: {
        email: email.value,
        password: password.value,
        role: role.value,
      },
    });
  }
};
</script>
