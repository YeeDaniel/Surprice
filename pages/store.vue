<template>
  <!-- 最外層：置中 + 限制寬度（模仿手機） -->
  <div class="min-h-screen bg-gray-100 px-4 py-6 flex justify-center">
    <div class="w-full max-w-[500px] relative">
      <!-- 餐廳 Header -->
      <div
        class="relative rounded-t-xl overflow-hidden"
        style="height: 160px;"
      >
        <img
          src="/shopbg.png"
          alt="餐廳背景"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <!-- 半透明遮罩讓文字更醒目 -->
        <div class="absolute inset-0 bg-black/30"></div>
        <div class="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <h2 class="text-xl font-semibold">King 美式餐廳</h2>
          <p class="text-xs mt-1">美式 · 距離 1.2 公里</p>
          <p class="text-xs mt-0.5">優惠時段 21:00 - 22:00</p>
        </div>
      </div>

      <!-- 卡片區塊：包含「現正優惠」+「過去優惠」列表 -->
      <div class="bg-white rounded-b-xl shadow-md">
        <div class="px-4 pt-4 pb-2">
          <!-- 現正優惠 標題 -->
          <h3 class="text-[#67C23A] font-bold text-base">現正優惠</h3>
        </div>
        <div class="px-4 pb-4 space-y-3">
          <div
            v-for="(item, index) in currentOffers"
            :key="`current-${index}`"
            class="flex bg-white rounded-lg overflow-hidden cursor-pointer"
            @click="goToProduct(item)"
          >
            <!-- 商品圖 -->
            <div class="w-20 h-20 flex-shrink-0">
              <img
                :src="item.image"
                alt="商品圖"
                class="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <!-- 文字區 -->
            <div class="flex-1 px-3 py-2 flex justify-between">
              <div>
                <p class="font-medium text-base mb-0.5">{{ item.name }}</p>
                <p class="text-xs text-gray-500 leading-tight">數量：{{ item.count }}</p>
                <p class="text-xs text-gray-500 leading-tight">折扣：{{ item.discount }}%</p>
                <p class="text-xs text-gray-500 leading-tight">原價：{{ item.originalPrice }}</p>
              </div>
              <div class="text-base font-bold text-black self-center">
                ${{ item.currentPrice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 在「現正優惠」和「過去優惠」之間加入灰色橫條分隔 -->
        <div class="h-2 bg-gray-200"></div>

        <div class="px-4 pt-2 pb-2">
          <!-- 過去優惠 標題 -->
          <h3 class="text-gray-500 font-bold text-base">過去優惠</h3>
        </div>
        <div class="px-4 pb-4 space-y-3">
          <div
            v-for="(item, index) in pastOffers"
            :key="`past-${index}`"
            class="flex bg-white rounded-lg overflow-hidden"
          >
            <!-- 商品圖 -->
            <div class="w-20 h-20 flex-shrink-0">
              <img
                :src="item.image"
                alt="商品圖"
                class="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <!-- 文字區 -->
            <div class="flex-1 px-3 py-2 flex justify-between">
              <div>
                <p class="font-medium text-base mb-0.5">{{ item.name }}</p>
                <p class="text-xs text-gray-400 leading-tight">數量：{{ item.count }}</p>
                <p class="text-xs text-gray-400 leading-tight">折扣：{{ item.discount }}%</p>
                <p class="text-xs text-gray-400 leading-tight">原價：{{ item.originalPrice }}</p>
              </div>
              <div class="text-base font-bold text-gray-400 self-center">
                ${{ item.currentPrice }}
              </div>
            </div>
          </div>
        </div>

        <!-- 底部按鈕：導航 & 最愛 -->
        <div class="px-4 pb-4 space-y-2">
          <button
            @click="navigateToMap"
            class="w-full bg-[#67C23A] text-white py-3 rounded-full font-semibold hover:bg-green-700 transition"
          >
            導航前往
          </button>
          <button
            @click="toggleFavorite"
            :class="[
              'w-full py-3 rounded-full font-semibold transition',
              isFavorited
                ? 'bg-white text-[#67C23A] border border-[#67C23A]'
                : 'bg-white text-[#67C23A] border border-[#67C23A]'
            ]"
          >
            {{ isFavorited ? '已加入最愛' : '加入最愛' }}
          </button>
        </div>
      </div>

      <!-- Toast + 霧化遮罩 -->
      <transition name="fade">
        <div
          v-if="showToast"
          class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div class="bg-gray-800 text-white text-sm px-4 py-2 rounded-lg">
            已加入最愛
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 模擬「現正優惠」資料
const currentOffers = ref([
  {
    id: 1,
    image: '/food1.png',
    name: '牛肉三明治',
    count: 2,
    discount: 60,
    originalPrice: 100,
    currentPrice: 60,
  },
  {
    id: 2,
    image: '/food2.png',
    name: '牛肉起司堡',
    count: 5,
    discount: 60,
    originalPrice: 120,
    currentPrice: 70,
  },
])

// 模擬「過去優惠」資料
const pastOffers = ref([
  {
    id: 3,
    image: '/food3.png',
    name: '雞肉三明治',
    count: 4,
    discount: 60,
    originalPrice: 85,
    currentPrice: 50,
  },
  {
    id: 4,
    image: '/food4.png',
    name: '花生培根牛肉堡',
    count: 2,
    discount: 60,
    originalPrice: 150,
    currentPrice: 90,
  },
])

// 最愛切換 + Toast
const isFavorited = ref(false)
const showToast = ref(false)
let toastTimer = null

function navigateToMap() {
  alert('⛳ 開啟導航功能（可改成真實地圖 API）')
}

function toggleFavorite() {
  isFavorited.value = !isFavorited.value

  // 顯示 Toast
  showToast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 1500)

  // 這邊可以把最愛存到後端或 localStorage
}

// 點擊「當前優惠」跳轉到 product 頁面
function goToProduct(item) {
  // 假設 product 頁面的路由是 /product
  router.push({ path: '/product' })
}

onBeforeUnmount(() => {
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
