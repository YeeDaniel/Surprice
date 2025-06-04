<template>
  <div class="min-h-screen bg-gray-100 px-4 py-6 flex justify-center">
    <div class="w-full sm:w-[400px] md:w-[500px] lg:w-[600px]">
      <!-- 店名標題 -->
      <h2
        class="text-center text-white text-xl font-semibold mb-2 bg-cover py-9 rounded-t-xl"
        style="background-image: url('/shopbg.png')"
      >
        King 美式餐廳
      </h2>

      <!-- 卡片區塊 -->
      <div class="bg-white rounded-b-xl shadow-md p-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-[#67C23A] font-bold text-2xl">新增商品</h3>
          <button
            @click="goToVoiceUpload"
            class="flex items-center gap-2 bg-[#67C23A] text-white text-base font-semibold px-4 py-2 rounded-full hover:bg-green-600"
          >
            <img src="/mic.svg" alt="Mic Icon" class="h-5 w-auto" />
            語音上架
          </button>
        </div>

        <!-- 商品照片 -->
        <div class="flex space-x-2 overflow-x-auto mb-4">
          <div
            v-for="(img, index) in previewImages"
            :key="index"
            class="relative flex-none w-32 h-32 border rounded-md overflow-hidden"
          >
            <img :src="img" class="w-full h-full object-cover" />
            <div
              v-if="index === 0"
              class="absolute bottom-0 left-0 right-0 bg-[#67C23A] text-white text-xs text-center py-1"
            >
              封面
            </div>
          </div>

          <!-- 上傳圖片區 -->
          <label
            class="flex-none w-32 h-32 flex justify-center items-center bg-gray-100 rounded-md border border-dashed cursor-pointer"
          >
            <input type="file" accept="image/*" hidden @change="onAddImage" />
            <span class="text-2xl text-gray-400 font-bold">+</span>
          </label>
        </div>

        <!-- 表單欄位 -->
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >商品名稱</label
        >
        <input
          v-model="product.name"
          class="form-input mb-3"
          placeholder="牛肉三明治"
        />

        <div class="flex space-x-2 mb-3">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >商品類型</label
            >
            <select v-model="product.type" class="form-select">
              <option>美式</option>
              <option>日式</option>
              <option>中式</option>
            </select>
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >商品數量</label
            >
            <select v-model="product.count" class="form-select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
        </div>

        <div class="flex space-x-2 mb-3">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >原定價格</label
            >
            <input
              v-model="product.originalPrice"
              class="form-input"
              placeholder="100"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >優惠價格</label
            >
            <input
              v-model="product.discountPrice"
              class="form-input"
              placeholder="60"
            />
          </div>
        </div>

        <label class="block text-sm font-medium text-gray-700 mb-1"
          >優惠時段</label
        >
        <select v-model="product.time" class="form-select mb-3">
          <option>21:00 - 22:00</option>
          <option>全天</option>
          <option>午餐限定</option>
        </select>

        <div class="flex items-center mb-4">
          <input
            type="checkbox"
            v-model="product.isFeatured"
            class="form-checkbox text-green-600 mr-2"
          />
          <label class="text-sm text-gray-700">加入常用商品</label>
        </div>

        <button
          @click="submitProduct"
          class="w-full bg-[#67C23A] text-white py-2 rounded-full font-semibold hover:bg-green-700 transition"
        >
          立即發布
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const previewImages = ref(["/food1.png", "/food2.png"]);

const product = ref({
  name: "牛肉三明治",
  type: "美式",
  count: 2,
  originalPrice: 100,
  discountPrice: 60,
  time: "21:00 - 22:00",
  isFeatured: false,
});

const onAddImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    previewImages.value.push(url);
  }
};

const submitProduct = () => {
  // alert('📦 商品資訊送出！\n' + JSON.stringify(product.value, null, 2))
  alert("已新增商品");
  navigateTo("/seller");
};

const goToVoiceUpload = () => {
  router.push("/upload2");
};
</script>

<style scoped>
.form-input {
  @apply w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300;
}

.form-select {
  @apply w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300;
}
</style>
