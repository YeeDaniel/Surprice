<template>
    <div class="max-w-md mx-auto px-4 py-6">
      <!-- 標題與排序 -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold text-gray-800">附近店家</h2>
        <button class="border px-3 py-1 rounded-full text-sm text-gray-600 flex items-center gap-1">
          排序
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </button>
      </div>
  
      <!-- 卡片列表 -->
      <div v-for="item in stores" :key="item.id" class="flex items-start bg-white rounded-lg shadow mb-4 p-3">
        <!-- 圖片 -->
        <img :src="item.image" alt="food" class="w-20 h-20 rounded-md object-cover mr-3" />
  
        <!-- 文字區 -->
        <div class="flex-1">
          <div class="flex justify-between items-start">
            <h3 class="text-sm font-semibold text-gray-900">{{ item.title }}</h3>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">{{ item.category }}</p>
          <p class="text-xs text-gray-500 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 12.414M12 4a8 8 0 100 16 8 8 0 000-16z" />
            </svg>
            {{ item.shop }} · {{ item.distance }}
          </p>
          <p class="text-xs text-gray-500">{{ item.time }}</p>
        </div>
  
        <!-- 價格與剩餘 -->
        <div class="flex flex-col justify-between items-end h-full ml-3">
          <div class="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            剩餘{{ item.remaining }}份
          </div>
          <div class="text-lg font-bold text-gray-800">${{ item.price }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const stores = [
    {
      id: 1,
      image: '/tofu.png',
      title: '臭豆腐',
      category: '台式小吃',
      shop: '王家臭豆腐',
      distance: '500m',
      time: '23:00 - 23:30',
      remaining: 5,
      price: 30,
    },
    {
      id: 2,
      image: '/sandwich.png',
      title: '牛肉三明治',
      category: '美式',
      shop: 'King 美式餐廳',
      distance: '1.2km',
      time: '21:00 - 22:00',
      remaining: 2,
      price: 60,
    },
    {
      id: 3,
      image: '/bread.png',
      title: '菠蘿麵包',
      category: '甜點',
      shop: '甜點研究社',
      distance: '800m',
      time: '不限',
      remaining: 1,
      price: 25,
    },
  ]
  </script>
  