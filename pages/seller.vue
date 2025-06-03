<template>
  <!-- 外層：置中 + 限制寬度、手機版感覺 -->
  <div class="min-h-screen bg-gray-100 flex justify-center px-4 py-6">
    <div class="w-full max-w-[500px]">
      <!-- 上方歡迎區 -->
      <div class="flex justify-between items-center mb-6">
        <div>
          <!-- 「你好,」文字更大、更粗 -->
          <p class="text-xl font-bold text-gray-700">你好,</p>
          <!-- 餐廳名稱更大、更粗 -->
          <p class="text-4xl font-extrabold">King 美式餐廳</p>
        </div>
        <!-- 圓形頭像 -->
        <div>
          <img
            src="/shopbg.png"
            alt="餐廳頭像"
            class="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </div>

      <!-- 上方兩個大按鈕 (常用上架 / 商品上架) -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <!-- 常用上架 -->
        <button
          @click="goToFavoriteUpload"
          class="bg-white rounded-lg shadow flex flex-col items-center justify-center py-8 hover:shadow-lg transition"
        >
          <!-- 使用 sellericon1.png 作為圖示 -->
          <img
            src="/sellericon1.png"
            alt="常用上架"
            class="h-12 w-12 mb-2 object-contain"
          />
          <!-- 文字更大、更粗 -->
          <span class="text-green-600 font-bold text-xl">常用上架</span>
        </button>

        <!-- 商品上架 -->
        <button
          @click="goToProductUpload"
          class="bg-white rounded-lg shadow flex flex-col items-center justify-center py-8 hover:shadow-lg transition"
        >
          <!-- 使用 sellericon2.png 作為圖示 -->
          <img
            src="/sellericon2.png"
            alt="商品上架"
            class="h-12 w-12 mb-2 object-contain"
          />
          <!-- 文字更大、更粗 -->
          <span class="text-green-600 font-bold text-xl">商品上架</span>
        </button>
      </div>

      <!-- 下方功能列表（Icon + 文字置中，使用 miniicon1~4.png） -->
      <div class="space-y-3 mb-6">
        <!-- 上架紀錄 -->
        <button
          @click="goToUploadHistory"
          class="w-full bg-white rounded-lg shadow flex items-center justify-center py-4 hover:shadow-lg transition"
        >
          <img
            src="/miniicon1.png"
            alt="上架紀錄"
            class="h-6 w-6 mr-2 object-contain"
          />
          <!-- 文字更大、更粗 -->
          <span class="text-gray-700 font-bold text-xl">上架紀錄</span>
        </button>

        <!-- 系統通知 -->
        <button
          @click="goToNotifications"
          class="w-full bg-white rounded-lg shadow flex items-center justify-center py-4 hover:shadow-lg transition"
        >
          <img
            src="/miniicon2.png"
            alt="系統通知"
            class="h-6 w-6 mr-2 object-contain"
          />
          <span class="text-gray-700 font-bold text-xl">系統通知</span>
        </button>

        <!-- 帳號設定 -->
        <button
          @click="goToAccountSettings"
          class="w-full bg-white rounded-lg shadow flex items-center justify-center py-4 hover:shadow-lg transition"
        >
          <img
            src="/miniicon3.png"
            alt="帳號設定"
            class="h-6 w-6 mr-2 object-contain"
          />
          <span class="text-gray-700 font-bold text-xl">帳號設定</span>
        </button>

        <!-- 系統設定 -->
        <button
          @click="goToSystemSettings"
          class="w-full bg-white rounded-lg shadow flex items-center justify-center py-4 hover:shadow-lg transition"
        >
          <img
            src="/miniicon4.png"
            alt="系統設定"
            class="h-6 w-6 mr-2 object-contain"
          />
          <span class="text-gray-700 font-bold text-xl">系統設定</span>
        </button>
      </div>

      <!-- 最下方「登出」按鈕 -->
      <div class="px-4">
        <button
          @click="logout"
          class="w-full bg-[#67C23A] text-white text-xl py-4 rounded-full font-bold hover:bg-green-700 transition"
        >
          登出
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToFavoriteUpload() {
  // 導向「常用上架」頁面
  router.push({ path: '/upload' })
}

function goToProductUpload() {
  // 導向「商品上架」頁面
  router.push({ path: '/upload' })
}

function goToUploadHistory() {
  router.push({ path: '/upload-history' })
}

function goToNotifications() {
  router.push({ path: '/notifications' })
}

function goToAccountSettings() {
  router.push({ path: '/account-settings' })
}

function goToSystemSettings() {
  router.push({ path: '/system-settings' })
}

function logout() {
  // 登出並導回登入頁（可改為實際邏輯）
  alert('已登出！')
  // router.push('/login')
}
</script>

<style scoped>
/* 淡入淡出過場效果 (如有需要可保留) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
