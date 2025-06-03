<template>
  <div class="flex items-center justify-center">
    <div
      class="flex h-full w-full items-center justify-between bg-primary px-4 py-4 pt-10 sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <!-- 左側圖示：根據 isStoreOrProduct 動態切換 -->
      <img
        class="cursor-pointer"
        :src="leftIcon"
        alt="Left Icon"
        @click="handleLeftClick"
      />

      <!-- 中間 Logo（不變） -->
      <img
        class="cursor-pointer"
        @click="toHomePage"
        src="/NavbarText.svg"
        alt="NavbarText"
      />

      <!-- 右側圖示：根據 isStoreOrProduct 動態切換，否則顯示收藏/取消收藏 -->
      <img
        class="cursor-pointer"
        :src="rightIcon"
        alt="Right Icon"
        @click="handleRightClick"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavoritesFilter } from '@/composables/useFavoritesFilter'

// 1. 取得當前路由和 router 實例
const route = useRoute()
const router = useRouter()

// 2. 引入 favorites filter 的切換邏輯
const { toggleFavoritesOnly, showFavoritesOnly } = useFavoritesFilter()

// 3. 判斷目前是否在 store 或 product 頁面（可改成你的路由 name 或 path）
const isStoreOrProduct = computed(() => {
  // 假設你的路由定義中，store 頁的 name 是 "store"，product 頁的 name 是 "product"
  // 如果你用 path，例如 "/store"、"/product"，也可以改成 route.path.includes('/store') 等判斷方式
  const name = route.name
  return name === 'store' || name === 'product'
})

// 4. 左側 icon 的動態路徑
const leftIcon = computed(() => {
  return isStoreOrProduct.value
    ? '/arrow.svg'   // store/product 頁面時顯示 arrow.svg
    : '/User.svg'    // 其他頁面顯示原本的 User.svg
})

// 5. 右側 icon 的動態路徑
const rightIcon = computed(() => {
  if (isStoreOrProduct.value) {
    return '/share.svg'  // store/product 頁面時顯示 share.svg
  }
  // 否則，依照 showFavoritesOnly 切換心形圖示
  return showFavoritesOnly.value
    ? '/NavbarHeartFill.png'
    : '/NavbarHeart.png'
})

// 6. 左側點擊行為：如果是 store/product 頁面就導回上一頁，否則無動作或自行補充
const handleLeftClick = () => {
  if (isStoreOrProduct.value) {
    router.back()
  }
  // 如果你希望非 store/product 時左側點擊有特殊行為，可在這裡補上
}

// 7. 右側點擊行為：在 store/product 頁面就可以觸發分享邏輯，否則執行切換收藏
const handleRightClick = () => {
  if (isStoreOrProduct.value) {
    // 這裡放你要的「分享」行為，例如跳出分享視窗或呼叫分享函式
    // 例如：shareCurrentProduct()；以下僅示範 console.log
    console.log('觸發分享邏輯')
    return
  }
  // 如果不是 store/product，維持原本的「顯示/隱藏我的最愛」邏輯
  toggleFavoritesOnly()
}

// 8. 中間 Logo 點擊：統一導回首頁
const toHomePage = () => {
  router.push('/')
}
</script>

<style scoped>
/* 如果你需要在 store/product 狀態下做額外 styling，也可以在這裡補充 */
</style>
