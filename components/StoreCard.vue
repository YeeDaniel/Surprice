<template>
  <div
    class="relative mb-3 flex w-full items-start rounded-xl bg-white p-3 shadow-sm cursor-pointer hover:shadow-md transition duration-200"
  >
    <!-- 圖片 -->
    <div class="relative h-20 w-20 shrink-0 overflow-hidden rounded-md">
      <img :src="store.image" class="h-full w-full object-cover" />
      <div
        class="absolute bottom-0 left-0 w-full bg-green bg-opacity-75 text-center text-xs text-white py-0.5"
      >
        剩餘{{ store.remaining }}份
      </div>
    </div>

    <!-- 右側資訊區塊 -->
    <div class="ml-4 flex flex-1 justify-between">
      <!-- 左區塊：標題與資訊 -->
      <div class="flex flex-col justify-center">
        <h3 class="text-base font-bold text-gray-800">{{ store.name }}</h3>
        <p class="text-xs text-gray-500 mt-1">🍱 {{ store.category }}</p>
        <p class="text-xs text-gray-500">📍 距離你 {{ store.distance }}</p>
        <p class="text-xs text-gray-500">🕒 {{ store.time }}</p>
      </div>

      <!-- 右區塊：折扣與價格 -->
      <div class="flex flex-col items-end justify-end ml-4 mt-auto">
        <span class="text-sm font-bold text-orange-500">{{
          store.discount
        }}</span>
        <span class="text-sm font-bold text-gray-800"
          >最低 ${{ store.price }}</span
        >
      </div>
    </div>

    <!-- 收藏 icon：右上 -->
    <button @click.stop="toggleFavorite" class="absolute right-3 top-3">
      <img
        :src="store.isFavorite ? '/heartFilled.png' : '/heartOutline.png'"
        class="h-5 w-5"
        alt="favorite"
      />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  store: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:favorite"]);

const toggleFavorite = () => {
  emit("update:favorite", props.store.id);
};
</script>
