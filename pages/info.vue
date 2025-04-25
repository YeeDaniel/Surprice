<template>
    <div class="form-container">
      <!-- 封面圖片上傳與預覽 -->
      <label class="upload-label">
        <input type="file" accept="image/*" @change="onImageSelected" hidden />
        <div class="image-preview" v-if="previewImage">
          <img :src="previewImage" alt="店家封面預覽" />
        </div>
        <div v-else class="upload-placeholder">＋加入門店封面照</div>
      </label>
  
      <!-- 表單 -->
      <div class="form-section">
        <h3 class="text-green-600 font-bold text-lg mb-4">店家資訊</h3>
        <label>門店名稱</label>
        <input v-model="store.name" placeholder="King 美式餐廳" />
  
        <label>門店地址</label>
        <input v-model="store.address" placeholder="台北市中正區重慶南路一段152號" />
  
        <label>營業時間</label>
        <select v-model="store.hours">
          <option value="16:00 - 22:00">16:00 - 22:00</option>
          <option value="11:00 - 20:00">11:00 - 20:00</option>
          <option value="全天">全天</option>
        </select>
  
        <label>餐食類型</label>
        <select v-model="store.cuisine">
          <option value="美式">美式</option>
          <option value="日式">日式</option>
          <option value="台式">台式</option>
          <option value="韓式">韓式</option>
        </select>
  
        <button @click="saveForm">儲存</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const store = ref({
    name: '',
    address: '',
    hours: '16:00 - 22:00',
    cuisine: '美式'
  })
  
  const previewImage = ref(null)
  
  function onImageSelected(event) {
    const file = event.target.files[0]
    if (file) {
      previewImage.value = URL.createObjectURL(file)
    }
  }
  
  function saveForm() {
    alert(JSON.stringify(store.value, null, 2))
  }
  </script>
  
  <style scoped>
  .form-container {
    max-width: 320px;
    margin: auto;
    font-family: sans-serif;
  }
  
  .upload-label {
    display: block;
    text-align: center;
    cursor: pointer;
    padding: 1rem;
    border-bottom: 1px solid #ccc;
  }
  
  .upload-placeholder {
    background-color: #f0f0f0;
    padding: 2rem;
    color: #888;
  }
  
  .image-preview img {
    max-width: 100%;
    border-radius: 8px;
  }
  
  .form-section {
    padding: 1rem;
    background: white;
    border-radius: 8px;
  }
  
  label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
  }
  
  input, select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.75rem;
    background-color: #7fb77e;
    border: none;
    color: white;
    font-weight: bold;
    border-radius: 999px;
    cursor: pointer;
  }
  </style>
  