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
        class="absolute bottom-0 z-10 flex h-[30%] w-full items-center justify-center rounded-tl-2xl rounded-tr-2xl bg-white"
      >
        <img
          src="/locatesite.png"
          alt="Locate Icon"
          class="absolute right-2 top-[-3rem] h-10 w-10 cursor-pointer transition-transform duration-200 hover:scale-110"
          @click="centerToUser"
        />
        <div
          class="flex w-full max-w-screen-sm items-center justify-center px-4"
        >
          <!-- ✅ 新增這個：右上角定位圖示 -->
          <img class="max-w-[33%] scale-75" src="/printer.png" alt="printer" />
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-sm font-bold text-[#46D1FE]">{{ statusText }}</h1>
            <div
              class="mt-2 flex items-center justify-center space-x-2 rounded-3xl"
            >
              <!-- 第 1 條進度條 -->
              <div class="loading-dot">
                <div
                  :class="[
                    'absolute inset-0 rounded-full transition-all duration-300',
                    currentStage === 1
                      ? 'fill-loop-infinite'
                      : currentStage > 1
                      ? 'bg-[#46d1fe]'
                      : 'bg-transparent',
                  ]"
                ></div>
              </div>

              <!-- 第 2 條進度條 -->
              <div class="loading-dot">
                <div
                  :class="[
                    'absolute inset-0 rounded-full transition-all duration-300',
                    currentStage === 2
                      ? 'fill-loop-infinite'
                      : currentStage > 2
                      ? 'bg-[#46d1fe]'
                      : 'bg-transparent',
                  ]"
                ></div>
              </div>

              <!-- 第 3 條進度條 -->
              <div class="loading-dot">
                <div
                  :class="[
                    'absolute inset-0 rounded-full transition-all duration-300',
                    currentStage === 3 ? 'fill-loop-once' : 'bg-transparent',
                  ]"
                ></div>
              </div>
            </div>
            <div
              v-show="currentStage === 2 || currentStage === 3"
              class="mt-4 flex w-full max-w-[500px] items-center justify-center"
            >
              <img class="scale-150 px-4" src="/walk.svg" alt="walk" />
              <h1 class="text-sm font-bold text-[#979797]">
                您可以準備前往取件
              </h1>
            </div>
            <div class="mx-2 flex items-center justify-center">
              <h1 class="text-2xl font-bold">
                {{
                  remainingMinutes > 0
                    ? `預計還有 ${remainingMinutes} 分鐘完成`
                    : "列印已完成"
                }}
              </h1>
            </div>
            <div class="mx-2 mt-2 flex items-center justify-center">
              <StartNavigationButton
                @click="calculateRoute"
                class="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const config = useRuntimeConfig().public.apiBase;
const jobStatus = ref("");
const jobId = useCookie("jobId");
const flag = ref(0);
const pollingInterval = ref(null); // 使用 ref 來管理 interval ID

const getJobStatus = async () => {
  try {
    const response = await fetch(`${config}/basic/jobs/${jobId.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Job Status:", data.status);
    jobStatus.value = data.status;

    // 對應三階段：pending → processing → completed
    if (jobStatus.value === "preparing") {
      currentStage.value = 1;
      if (flag.value === 0) {
        await startPrint();
        flag.value = 1;
      }
    } else if (jobStatus.value === "processing") {
      currentStage.value = 2;
    } else if (jobStatus.value === "completed") {
      currentStage.value = 3;
      remainingMinutes.value = 0;
      // 先清除 interval
      if (pollingInterval.value) {
        clearInterval(pollingInterval.value);
        pollingInterval.value = null;
      }
      // 然後導航到 final 頁面
      setTimeout(() => {
        navigateTo("/final");
      }, 6000);
    }
  } catch (error) {
    console.error("發送失敗：", error);
  }
};

const startPrint = async () => {
  try {
    const response = await fetch(`${config}/basic/print/${jobId.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    await getJobStatus();
  } catch (error) {
    console.error("發送失敗：", error);
  }
};

const remainingMinutes = ref(2);

const statusText = computed(() => {
  switch (currentStage.value) {
    case 1:
      return "等待列印";
    case 2:
      return "列印中";
    case 3:
      return "列印完成";
    default:
      return "";
  }
});

const currentStage = ref(0);

// const startLoadingStages = () => {
//   currentStage.value = 0
//   const interval = 2000 // 每階段 2 秒

//   const next = () => {
//     if (currentStage.value < 3) {
//       currentStage.value++
//       setTimeout(next, interval)
//     }
//   }
//   next()
// }

let map;
let directionsService;
let directionsRenderer;
let userMarker;
let infoWindow = null; // ← 先在上方宣告

const centerToUser = () => {
  if (userMarker) {
    const position = userMarker.getPosition();
    map.setCenter(position);
    map.setZoom(17); // 可選：想讓它拉近一點看清楚

    // 視窗向上移動 100px（x, y）
    map.panBy(0, 100);
  } else {
    alert("目前位置尚未定位完成");
  }
};

const calculateRoute = () => {
  if (!userMarker) {
    alert("尚未取得目前位置");
    return;
  }

  const start = userMarker.getPosition();
  const end = { lat: 25.04550058100967, lng: 121.54846088465462 };

  const request = {
    origin: start,
    destination: end,
    travelMode: "WALKING",
  };

  directionsService.route(request, function (result, status) {
    if (status === "OK") {
      directionsRenderer.setDirections(result);

      const leg = result.routes[0].legs[0];
      document.getElementById("output").innerHTML = `
          距離：${leg.distance.text}<br>
          行駛時間：${leg.duration.text}
        `;

      // ✅ 顯示在路線中間的資訊視窗
      const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="font-size: 12px; font-weight: 500; color: #46D1FE; padding: 0px 0px">
              ${leg.duration.text}（${leg.distance.text}）
            </div>
          `,
        position: leg.steps[Math.floor(leg.steps.length / 2)].start_location,
      });

      infoWindow.open(map);
    } else {
      alert("找不到路線：" + status);
    }
  });
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

  new google.maps.Marker({
    position: { lat: 25.04550058100967, lng: 121.54846088465462 },
    map,
    icon: "/Icon.svg",
  });

  // 使用者定位
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
    });
  }

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    polylineOptions: {
      strokeColor: "#FFCE30", // ✅ 你要的藍色
      strokeOpacity: 0.9,
      strokeWeight: 6, // 粗細
    },
  });
  directionsRenderer.setMap(map);

  // setInterval(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const currentLocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       }

  //       if (userMarker) {
  //         userMarker.setPosition(currentLocation)
  //       } else {
  //         userMarker = new google.maps.Marker({
  //           position: currentLocation,
  //           map,
  //           title: '你的位置',
  //           icon: {
  //             url: '/currentLocation.png', // ✅ 你的圖示路徑
  //             scaledSize: new google.maps.Size(32, 32), // ✅ 控制圖示大小 (像素)
  //           },
  //         })
  //       }

  //       map.setCenter(currentLocation)
  //     })
  //   }
  // }, 5000)
};

onMounted(async () => {
  await loadGoogleMaps();
  initMap();
  remainingMinutes.value = 1;

  // 🔁 每 1.5 秒輪詢狀態
  pollingInterval.value = setInterval(() => {
    getJobStatus();
  }, 1500);

  getJobStatus();
});
</script>

<style scoped>
/* @keyframes dotPulse {
    0%,
    80%,
    100% {
      background-color: #d8d8d8;
      transform: scale(1);
      opacity: 0.3;
    }
    40% {
      background-color: #46d1fe;
      transform: scale(1.3);
      opacity: 1;
    }
  } */

.loading-dot {
  width: 80px;
  height: 4px;
  background-color: #d8d8d8;
  border-radius: 9999px;
  overflow: hidden;
  position: relative; /* ✅ 讓內部 div 絕對定位時有參照 */
}

@keyframes fillLoop {
  0% {
    width: 0%;
  }
  99% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

/* 無限閃動畫（給第1與第2階段用） */
.fill-loop-infinite {
  width: 100%;
  height: 100%;
  background-color: #46d1fe;
  border-radius: 9999px;
  animation: fillLoop 2s infinite ease-in-out;
}

/* 單次動畫（給第3階段用） */
.fill-loop-once {
  width: 100%;
  height: 100%;
  background-color: #46d1fe;
  border-radius: 9999px;
  animation: fillLoop 2s ease-in-out;
}

/* .delay-0 {
    animation-delay: 0s;
  }
  .delay-200 {
    animation-delay: 0.65s;
  }
  .delay-400 {
    animation-delay: 1.3s;
  } */
</style>
