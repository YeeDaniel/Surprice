<template>
  <div class="flex h-screen flex-col items-center justify-center">
    <!-- 整體包一層限制寬度的容器 -->
    <div
      class="relative flex h-full w-full flex-col items-center justify-center bg-red-50 sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <div id="map" class="w-full flex-1"></div>
      <div id="output"></div>

      <!-- 💡 這個 absolute 區塊現在是參照上面容器的寬度 -->

      <div
        v-if="!isLoadingComplete"
        class="absolute bottom-0 top-[65%] z-10 flex w-full flex-col items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-white"
      >
        <!-- ✅ 新增這個：右上角定位圖示 -->
        <!-- <img
          src="/locatesite.png"
          alt="Locate Icon"
          class="absolute right-2 top-[-3rem] h-10 w-10 cursor-pointer transition-transform duration-200 hover:scale-110"
          @click="centerToUser"
        /> -->
        <!-- 這段 loading 的動畫區塊等定位完成後再顯示 -->
        <div class="fade-in flex flex-col items-center justify-center">
          <div
            class="absolute bottom-[6rem] top-[3rem] flex items-center justify-center"
          >
            <!-- <img
              class="animate-pulse-opacity relative left-4 scale-50"
              src="/locationLoading1.png"
              alt="Loading"
            /> -->
            <!-- <img
              class="relative right-[4.45rem] scale-50"
              src="/locationLoading2.png"
              alt="Loading"
            /> -->
          </div>
          <h1 class="mt-16 text-2xl font-bold text-[#979797]">
            正在偵測周圍可用印表機...
          </h1>
          <!-- 你之前的 loading dots 與導航按鈕等等 -->
        </div>
        <!-- ✅ loading結束：顯示成功訊息 or 其他內容 ，余哥這邊就是 info 的實作地方，交給你囉-->
        <!-- <div v-show="isLoadingComplete" class="fade-in flex flex-col items-center">
            <h1 class="text-xl font-bold text-[#46D1FE]">附近印表機已偵測</h1>
          </div> -->
        <!-- ✅ loading結束：顯示成功訊息 or 其他內容 -->
      </div>
      <div
        v-if="isLoadingComplete"
        class="absolute bottom-0 top-[65%] z-10 flex w-full flex-col items-center justify-start rounded-tl-2xl rounded-tr-2xl bg-gray-50"
      >
        <!-- <img
          src="/locatesite.png"
          alt="Locate Icon"
          class="absolute right-2 top-[-3rem] h-10 w-10 cursor-pointer transition-transform duration-200 hover:scale-110"
          @click="centerToUser"
        /> -->
        <div class="fade-in flex w-full flex-col items-center">
          <!-- 表頭 -->
          <div
            class="grid w-full grid-cols-4 gap-2 rounded-t-xl bg-gradient-to-r from-sky-400 to-cyan-400 px-2 py-1.5 text-center text-sm font-bold text-white shadow"
          >
            <div>機台資訊</div>
            <div>排隊人數</div>
            <div>預估時間</div>
            <div>目前距離</div>
          </div>

          <!-- 印表機清單 -->
          <div class="mt-1 w-full space-y-[6px]">
            <!-- 印表機一 -->
            <div
              class="grid cursor-pointer grid-cols-4 items-start gap-[1px] rounded-xl bg-white px-2 py-2 shadow-sm"
              @click="changeIntoWaitingPage"
            >
              <div class="flex flex-col items-center gap-[1px] text-sm">
                <!-- <img
                  src="/printer1.png"
                  alt="Printer L6490"
                  class="mb-[1px] h-11 w-auto"
                /> -->
                <span class="text-[14px] font-bold text-[#4D4D4D]">L6490</span>
              </div>
              <div class="flex flex-col items-center gap-[1px] text-sm">
                <div class="h-4"></div>
                <span class="text-[14px] font-bold text-[#4D4D4D]">0人</span>
                <span
                  class="rounded-full border border-cyan-400 px-2 py-[1px] text-[12px] font-bold text-cyan-500"
                  >最少</span
                >
              </div>
              <div class="flex flex-col items-center gap-[1px] text-sm">
                <div class="h-4"></div>
                <span class="text-[14px] font-bold text-[#4D4D4D]">0分鐘</span>
                <span
                  class="rounded-full border border-cyan-400 px-2 py-[1px] text-[12px] font-bold text-cyan-500"
                  >最快</span
                >
              </div>
              <div class="flex flex-col items-center gap-[1px] text-sm">
                <div class="h-4"></div>
                <span class="text-[14px] font-bold text-[#4D4D4D]">0M</span>
                <span
                  class="rounded-full border border-cyan-400 px-2 py-[1px] text-[12px] font-bold text-cyan-500"
                  >最近</span
                >
              </div>
            </div>

            <!-- 印表機二 -->
            <!-- <div
                class="grid cursor-pointer grid-cols-4 items-start gap-[1px] rounded-xl bg-white px-2 py-2 shadow-sm"
                @click="changeIntoWaitingPage"
              >
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <img src="/printer2.png" alt="Printer L14150" class="mb-[1px] h-11 w-auto" />
                  <span class="text-[14px] font-bold text-[#4D4D4D]">L14150</span>
                </div>
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <div class="h-4"></div>
                  <span class="text-[14px] font-bold text-[#4D4D4D]">3人</span>
                </div>
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <div class="h-4"></div>
                  <span class="text-[14px] font-bold text-[#4D4D4D]">8分鐘</span>
                </div>
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <div class="h-4"></div>
                  <span class="text-[14px] font-bold text-[#4D4D4D]">250M</span>
                </div>
              </div> -->

            <!-- 印表機三 -->
            <!-- <div
                class="grid cursor-pointer grid-cols-4 items-start gap-[1px] rounded-xl bg-white px-2 py-2 shadow-sm"
                @click="changeIntoWaitingPage"
              >
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <img src="/printer3.png" alt="Printer L11050" class="mb-[1px] h-11 w-auto" />
                  <span class="text-[14px] font-bold text-[#4D4D4D]">L11050</span>
                </div>
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <div class="h-4"></div>
                  <span class="text-[14px] font-bold text-[#4D4D4D]">2人</span>
                </div>
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <div class="h-4"></div>
                  <span class="text-[14px] font-bold text-[#4D4D4D]">5分鐘</span>
                </div>
                <div class="flex flex-col items-center gap-[1px] text-sm">
                  <div class="h-4"></div>
                  <span class="text-[14px] font-bold text-[#4D4D4D]">1KM</span>
                </div>
              </div> -->
          </div>
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
  customMarkers.push(
    new google.maps.Marker({
      position: { lat: 25.04550058100967, lng: 121.54846088465462 },
      map,
      icon: "/Icon.svg",
    })
  );

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
      isLoadingComplete.value = true;
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
