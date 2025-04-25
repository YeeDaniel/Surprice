<template>
  <div class="flex items-center justify-center">
    <div
      class="flex h-screen w-full flex-col items-center justify-center bg-primary sm:w-[400px] md:w-[500px] lg:w-[600px]"
    >
      <div class="flex h-[75%] items-center justify-center">
        <!-- <img class="scale-50" src="/icon.png" alt="PrinterChain" /> -->
      </div>
      <div class="flex h-[25%] flex-col items-center justify-center">
        <UserButton @click="toPrintPage" class="my-2 cursor-pointer" />
        <SellerButton class="my-2 cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig().public.apiBase;

const toPrintPage = async () => {
  try {
    const response = await fetch(`${config}/basic/token/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("回傳資料：", data);

    if (data.is_valid === false) {
      window.open(data.auth_url, "_blank");
    } else {
      navigateTo("/new");
    }
  } catch (error) {
    console.error("發送失敗：", error);
  }
};
</script>

<style scoped></style>
