<template>
  <!-- 最外層：置中 + 限制寬度（模仿手機） -->
  <div class="min-h-screen bg-gray-100 px-4 py-6 flex justify-center">
    <div class="w-full sm:w-[400px] md:w-[500px]">
      <!-- 圖片 Carousel 區塊 -->
      <div class="relative w-full h-56 rounded-lg overflow-hidden mb-4">
        <!-- 依 currentIndex 顯示對應的那一張圖 -->
        <img
          v-for="(img, idx) in offerDetail.images"
          :key="idx"
          :src="img"
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          :class="idx === currentIndex ? 'opacity-100' : 'opacity-0'"
          alt="商品圖"
        />

        <!-- 左右切換按鈕（可選擇保留或註解掉） -->
        <button
          @click="prevImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- 圓點指示器 -->
        <div class="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
          <span
            v-for="(img, idx) in offerDetail.images"
            :key="idx"
            class="w-2 h-2 rounded-full"
            :class="idx === currentIndex ? 'bg-white' : 'bg-white/50'"
          ></span>
        </div>
      </div>

      <!-- 商品資訊區塊 -->
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <!-- 名稱 ＆ 價格 -->
        <div class="flex justify-between items-center mb-2">
          <p class="text-lg font-semibold">{{ offerDetail.name }}</p>
          <p class="text-xl font-bold text-[#67C23A]">${{ offerDetail.currentPrice }}</p>
        </div>
        <!-- 數量、折扣、原價（三行小字）-->
        <p class="text-xs text-gray-500 mb-0.5">數量：{{ offerDetail.count }}</p>
        <p class="text-xs text-gray-500 mb-0.5">折扣：{{ offerDetail.discount }}%</p>
        <p class="text-xs text-gray-500">原價：{{ offerDetail.originalPrice }}</p>
      </div>

      <!-- 商家資訊區塊 -->
      <div class="bg-white rounded-lg shadow p-4 mb-4">
        <h3 class="text-sm font-medium text-gray-700 mb-2">商家資訊</h3>
        <div class="space-y-2 text-sm text-gray-600">
          <div class="flex items-center">
            <!-- 店鋪 Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10l1.553 6.214A2 2 0 006.493 18h11.014a2 2 0 001.94-1.786L21 10M3 10l9-6 9 6M4 10h16M5 21h14"
              />
            </svg>
            <span>{{ offerDetail.merchant.name }}</span>
          </div>
          <div class="flex items-center">
            <!-- 類型 Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h18M3 10h18M3 15h18M3 20h18"
              />
            </svg>
            <span>{{ offerDetail.merchant.type }}</span>
          </div>
          <div class="flex items-center">
            <!-- 地址 Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 12m0 0L8.343 7.343m5.071 4.657l4.242-4.243M12 19a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
            <span>{{ offerDetail.merchant.address }}</span>
          </div>
          <div class="flex items-center">
            <!-- 時間 Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-gray-500 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ offerDetail.merchant.time }}</span>
          </div>
        </div>
      </div>

      <!-- 底部按鈕：導航前往 & 加入最愛 -->
      <div class="space-y-2 mb-8">
        <button
          @click="navigateToMap"
          class="w-full bg-[#67C23A] text-white py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          導航前往
        </button>
        <button
          @click="addToFavorites"
          class="w-full bg-white border border-[#67C23A] text-[#67C23A] py-2 rounded-full font-semibold hover:bg-[#f0fdf4] transition"
        >
          加入最愛
        </button>
      </div>
    </div>

    <!-- Toast 提示：已加入最愛 -->
    <transition name="fade">
      <div
        v-if="showToast"
        class="fixed inset-0 flex items-center justify-center 
               bg-black/40 backdrop-blur-sm"
      >
        <div class="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg">
          已加入最愛
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// ----------------------------------------------------------------------------
// 把「offerDetail.images」寫死，避免拿不到資料時出錯
// ----------------------------------------------------------------------------
const offerDetail = ref({
  images: [
    // 確保這些圖放在 public 資料夾底下
    '/beef1.png',
    '/beef2.png',
    '/beef3.png',
  ],
  name: '牛肉三明治',
  count: 2,
  discount: 60,
  originalPrice: 100,
  currentPrice: 60,
  merchant: {
    name: 'King 美式餐廳',
    type: '美式',
    address: '新北市三重區重新路二段156號',
    time: '21:00 - 22:00',
  },
})

// Carousel 目前顯示的圖片索引
const currentIndex = ref(0)
let carouselTimer = null

// Toast 控制
const showToast = ref(false)
let toastTimer = null

// 切換到下一張
function nextImage() {
  currentIndex.value =
    (currentIndex.value + 1) % offerDetail.value.images.length
}

// 切換到上一張
function prevImage() {
  currentIndex.value =
    (currentIndex.value - 1 + offerDetail.value.images.length) %
    offerDetail.value.images.length
}

// 如果要自動輪播，要在 client 端呼叫 setInterval（放到 onMounted 裡）
function startCarouselAutoplay() {
  carouselTimer = setInterval(() => {
    nextImage()
  }, 3000)
}

// 停掉自動輪播
function stopCarouselAutoplay() {
  if (carouselTimer) {
    clearInterval(carouselTimer)
    carouselTimer = null
  }
}

// 導航按鈕（可自行改成真實地圖邏輯）
function navigateToMap() {
  alert('⛳ 開啟導航功能（請自行改成真實地圖呼叫）')
}

// 加入最愛：顯示 Toast 1.5 秒
function addToFavorites() {
  showToast.value = true
  if (toastTimer) clearTimeout(toastTimer)

  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 1500)
}

// 在元件掛載後（也就是進到 client 瀏覽器時）啟動自動輪播
onMounted(() => {
  startCarouselAutoplay()
})

// 在元件卸載前，清掉所有定時器
onBeforeUnmount(() => {
  stopCarouselAutoplay()
  if (toastTimer) clearTimeout(toastTimer)
})
</script>

<style scoped>
/* 淡入淡出過場效果 */
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
