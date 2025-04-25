<template>
    <div class="min-h-screen bg-gray-100 px-4 py-6 flex justify-center">
      <div class="w-full max-w-md">
        <!-- 頁首店名區塊 -->
        <h2
          class="text-center text-white text-xl font-semibold mb-2 bg-cover py-9 rounded-t-xl"
          style="background-image: url('/shopbg.png')"
        >
          King 美式餐廳
        </h2>
  
        <!-- 表單主卡片 -->
        <div class="bg-white rounded-b-xl shadow-md p-5">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-[#67C23A] font-bold text-2xl">新增商品</h3>

  
            <!-- ✅ 文字上架按鈕加上導頁 -->
            <button
            @click="goToTextUpload"
            class="flex items-center gap-2 bg-[#67C23A] text-white text-base font-semibold px-4 py-2 rounded-full hover:bg-green-600"
            >
            <img src="/pen.svg" alt="Pencil Icon" class="h-5 w-auto" />
            文字上架
            </button>

          </div>
  
          <p class="text-xs text-gray-500 mb-2">
            * 語音輸入後可直接於下方修改內容
          </p>
  
          <!-- 語音轉文字框 -->
          <textarea
            v-model="speechText"
            rows="5"
            class="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 mb-4"
          ></textarea>
  
          <!-- 套用按鈕 -->
          <button
            @click="applySpeech"
            class="w-full bg-[#67C23A] hover:bg-green-600 text-white font-semibold py-2 rounded-full text-sm transition mb-6"
          >
            確認套用
          </button>
  
          <!-- 語音按鈕 -->
          <div class="flex flex-col items-center space-y-2">
            <div class="bg-[#67C23A] w-32 h-32 rounded-full flex items-center justify-center shadow-md">
              <svg class="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3z" />
                <path
                  d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.92V21a1 1 0 1 0 2 0v-3.08A7 7 0 0 0 19 11z"
                />
              </svg>
            </div>
            <span class="text-sm text-gray-500">按住 說話</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router' // ✅ 引入 router
  
  const router = useRouter()
  
  const speechText = ref(
    '我要上架兩個牛肉三明治，原價是100塊，我優惠價賣60塊，優惠時段是晚上九點到十點之間。'
  )
  
  function applySpeech() {
    alert('✅ 套用內容：\n' + speechText.value)
  }
  
  // ✅ 文字上架導頁
  function goToTextUpload() {
    router.push('/upload')
  }
  </script>
  