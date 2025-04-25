<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <!-- 整體包一層限制寬度的容器 -->
    <div
      class="relative flex h-full w-full flex-col items-center justify-center bg-red-50 sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <div id="map" class="w-full flex-1"></div>
      <div id="output"></div>

      <!-- 搜尋欄 + 篩選按鈕 -->
      <div class="absolute top-2 left-4 right-4 z-20 flex items-center gap-2">
        <!-- 搜尋框 -->
        <div
          class="flex flex-1 items-center rounded-full bg-white px-4 py-2 shadow-md"
        >
          <svg
            class="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
          <input
            v-model="searchText"
            type="text"
            placeholder="搜尋地區／店家／品項"
            class="ml-2 flex-1 border-none bg-transparent text-sm text-gray-700 focus:outline-none"
          />
        </div>

        <!-- 篩選按鈕 -->

        <img
          @click="toggleFilter"
          class="cursor-pointer w-10 h-10"
          src="/SelectIcon.svg"
          alt="Select Icon"
        />
      </div>

      <!-- 💡 這個 absolute 區塊現在是參照上面容器的寬度 -->

      <div
        v-if="!isLoadingComplete"
        class="absolute bottom-0 top-[65%] z-10 flex w-full flex-col items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-white"
      >
        <!-- ✅ 新增這個：右上角定位圖示 -->
        <img
          src="/locatesite.svg"
          alt="Locate Icon"
          class="absolute right-2 top-[-3rem] h-10 w-10 cursor-pointer transition-transform duration-200 hover:scale-110"
          @click="centerToUser"
        />
        <!-- 這段 loading 的動畫區塊等定位完成後再顯示 -->
        <div class="fade-in flex flex-col items-center justify-center">
          <div
            class="absolute bottom-[6rem] top-[3rem] flex items-center justify-center"
          >
            <img
              class="animate-pulse-opacity relative left-4 scale-50"
              src="/locationLoading1.png"
              alt="Loading"
            />
            <img
              class="relative right-[3.85rem] scale-50"
              src="/locationLoading2.png"
              alt="Loading"
            />
          </div>
          <h1 class="mt-16 text-2xl font-bold text-dark-txt">
            正在尋找附近店家...
          </h1>
          <!-- 你之前的 loading dots 與導航按鈕等等 -->
        </div>
        <!-- ✅ loading結束：顯示成功訊息 or 其他內容 ，余哥這邊就是 info 的實作地方，交給你囉-->
        <!-- <div v-show="isLoadingComplete" class="fade-in flex flex-col items-center">
            <h1 class="text-xl font-bold text-[#46D1FE]">附近印表機已偵測</h1>
          </div> -->
        <!-- ✅ loading結束：顯示成功訊息 or 其他內容 -->
      </div>
    </div>
    <!-- 偏好選單 Modal -->
    <div
      v-if="showFilterModal"
      class="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="w-[90%] max-w-md rounded-xl bg-white p-5 shadow-xl"
        @click.stop
      >
        <!-- 標題 -->
        <h2 class="mb-4 text-center text-lg font-bold text-dark-txt">
          選擇你的偏好
        </h2>

        <!-- 食物類型 -->
        <div class="mb-3">
          <p class="mb-1 font-semibold text-dark-txt">食物類型</p>
          <div class="flex flex-wrap gap-2">
            <FilterTag
              v-for="item in foodOptions"
              :key="item"
              :label="item"
              v-model:selected="selectedFood"
            />
          </div>
        </div>

        <!-- 飲食限制 -->
        <div class="mb-3">
          <p class="mb-1 font-semibold text-dark-txt">飲食限制</p>
          <div class="flex flex-wrap gap-2">
            <FilterTag
              v-for="item in dietOptions"
              :key="item"
              :label="item"
              v-model:selected="selectedDiet"
            />
          </div>
        </div>

        <!-- 隨機驚喜餐盒 -->
        <div class="mb-4 flex items-center gap-2">
          <input type="checkbox" id="surprise" v-model="acceptSurprise" />
          <label for="surprise" class="text-sm text-gray-600">
            接受隨機驚喜餐盒
            <br />
            <span class="text-xs text-gray-400"
              >* 此選項無法指定／更換品項或客製化調整。</span
            >
          </label>
        </div>

        <!-- 按鈕 -->
        <div class="mt-3 flex gap-3 flex-col">
          <button
            class="flex-1 rounded-full bg-green-500 py-2 text-white"
            @click="submitFilter"
          >
            確認
          </button>
          <button
            class="flex-1 rounded-full border border-green-500 py-2 text-green-500"
            @click="closeFilter"
          >
            略過
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const isLoadingComplete = ref(false);
const customMarkers = [];

let map;
let directionsRenderer;
let userMarker;

const showFilterModal = ref(false);

const foodOptions = [
  "全部",
  "生鮮商品",
  "蔬菜水果",
  "熟食",
  "主食",
  "小吃",
  "甜點",
  "飲料",
  "台式料理",
  "異國料理",
];
const dietOptions = [
  "無限制",
  "純素食",
  "蔬食",
  "無麩質",
  "無牛肉",
  "無雞肉",
  "無豬肉",
  "無海鮮",
  "無辛香料",
];

const selectedFood = ref([]);
const selectedDiet = ref([]);
const acceptSurprise = ref(false);

const toggleFilter = () => {
  showFilterModal.value = true;
};
const closeFilter = () => {
  showFilterModal.value = false;
};
const submitFilter = () => {
  // 🔍 傳送到搜尋邏輯 or 儲存偏好
  console.log("食物偏好:", selectedFood.value);
  console.log("飲食限制:", selectedDiet.value);
  console.log("驚喜餐盒:", acceptSurprise.value);
  closeFilter();
};

const searchText = ref("");

const changeIntoWaitingPage = () => {
  navigateTo("/waiting");
};

const centerToUser = () => {
  if (userMarker) {
    const position = userMarker.getPosition();
    map.setCenter(position);
    map.setZoom(17); // 可選：想讓它拉近一點看清楚

    // 視窗向上移動 100px（x, y）
    map.panBy(0, 150);
  } else {
    alert("目前位置尚未定位完成");
  }
};

const loadGoogleMaps = () => {
  return new Promise((resolve) => {
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnFqbdR7oJyV2V37SI_PmjACDRsXihLEg";
    script.async = true;
    script.onload = resolve;
    document.head.appendChild(script);
  });
};

const initMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 24.968205, lng: 121.191589 },
    zoom: 15,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "water",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  });

  // 自訂標記
  // customMarkers.push(
  //   new google.maps.Marker({
  //     position: { lat: 25.04550058100967, lng: 121.54846088465462 },
  //     map,
  //     // icon: "/Icon.svg",
  //   })
  // );

  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(currentLocation);

      userMarker = new google.maps.Marker({
        position: currentLocation,
        map,
        title: "你的位置",
        icon: {
          url: "/currentLocation.png", // ✅ 你的圖示路徑
          scaledSize: new google.maps.Size(32, 32), // ✅ 控制圖示大小 (像素)
        },
      });

      // 顯示所有標記
      customMarkers.forEach((marker) => marker.setVisible(true));
      userMarker.setVisible(true);
      // 開啟畫面顯示
      // isLoadingComplete.value = true;
    });
  }
};

onMounted(async () => {
  await loadGoogleMaps();
  initMap();
});
</script>

<style scoped>
/* 可選：額外樣式 */
@keyframes pulseOpacity {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

.animate-pulse-opacity {
  animation: pulseOpacity 1.5s infinite;
}

.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
