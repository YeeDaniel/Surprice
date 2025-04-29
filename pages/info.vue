<template>
    <div class="bg-gray-100  px-4 pt-6 pb-10 flex justify-center">
      <div class="w-full sm:w-[400px] md:w-[500px] lg:w-[600px]">
        <!-- 封面上傳 -->
        <label class="block cursor-pointer text-center mb-4">
          <input type="file" accept="image/*" @change="onImageSelected" hidden />
          <div
            v-if="previewImage"
            class="rounded-md overflow-hidden shadow border border-gray-200"
          >
            <img :src="previewImage" alt="店家封面" class="w-full object-cover" />
          </div>
          <div
            v-else
            class="bg-gray-200 p-6 rounded-md text-gray-500 flex items-center justify-center shadow-inner"
          >
            ＋加入門店封面照
          </div>
        </label>
  
        <!-- 表單卡片 -->
        <div class="bg-white rounded-xl shadow-md p-5">
          <h3 class="text-[#40A944] font-bold text-base mb-4">店家資訊</h3>
  
          <div class="mb-3">
            <label class="block text-sm text-gray-700 font-medium mb-1">門店名稱</label>
            <input
              v-model="store.name"
              placeholder="King 美式餐廳"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
  
          <div class="mb-3">
            <label class="block text-sm text-gray-700 font-medium mb-1">門店地址</label>
            <input
              v-model="store.address"
              placeholder="台北市中正區重慶南路一段152號"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
  
          <div class="mb-3">
            <label class="block text-sm text-gray-700 font-medium mb-1">營業時間</label>
            <select
              v-model="store.hours"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option>16:00 - 22:00</option>
              <option>11:00 - 20:00</option>
              <option>全天</option>
            </select>
          </div>
  
          <div class="mb-5">
            <label class="block text-sm text-gray-700 font-medium mb-1">餐食類型</label>
            <select
              v-model="store.cuisine"
              class="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option>美式</option>
              <option>日式</option>
              <option>台式</option>
              <option>韓式</option>
            </select>
          </div>
  
          <button
            @click="saveForm"
            class="w-full bg-[#6DBD6A] hover:bg-green-600 text-white font-semibold py-2 rounded-full text-sm transition duration-300"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router' // ✅ 引入 vue-router
  
  const router = useRouter() // ✅ 初始化 router
  
  const store = ref({
    name: '',
    address: '',
    hours: '16:00 - 22:00',
    cuisine: '美式',
  })
  
  const previewImage = ref(null)
  
  function onImageSelected(e) {
    const file = e.target.files[0]
    if (file) {
      previewImage.value = URL.createObjectURL(file)
    }
  }
  
  function saveForm() {
    // 你可以先驗證資料，再跳轉
    console.log('儲存資料：', store.value)
    router.push('/upload') // ✅ 導向下一頁
  }
  </script>
  