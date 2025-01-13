<template>
  <div class="w-screen h-screen bg-black bg-opacity-30 fixed z-50 inset-0 flex items-center justify-center"
       @click="closeProfile">
    <div class="fixed flex flex-col items-center bg-card w-1/5 h-fit z-60 border border-border rounded-xl shadow"
         @click.stop>
      <div class="flex justify-between items-center w-full h-fit pl-4 pr-3 pt-4">
        <p class="text-darkPurple font-exo text-[20px] mr-16">Мой профиль</p>
        <button class="rounded-[100%] hover:bg-lilac p-2" @click="openAccount">
          <img src="/src/assets/images/edit.svg" alt="">
        </button>
        <button class="rounded-[100%] hover:bg-lilac p-2" @click="closeProfile">
          <img src="/src/assets/images/close.svg" alt="">
        </button>
      </div>
      <div class="flex items-center w-full my-4 h-fit border-b-4 border-border px-4 pb-4">
        <img :src="profileStore.myProfile.picRef" alt="" class="w-[70px] h-[70px] rounded-[100%] mr-3"/>
        <p class="text-darkPurple font-exo text-[18px] truncate">{{ profileStore.myProfile.firstName }}
          {{ profileStore.myProfile.lastName }}</p>
      </div>
      <div class="flex flex-col items-start w-full pl-4 pb-4">
        <div class="flex items-start w-full pr-4">
          <img src="/src/assets/images/info.svg" alt="">
          <div class="w-[90%]">
            <p class="text-darkPurple font-nunito text-[16px] pl-4 truncate">{{ profileStore.myProfile.email }}</p>
            <p class="pl-4 text-purpleShade font-nunito text-[16px] mb-3">Электронная почта</p>
            <p class="pl-4 font-nunito text-[16px] break-all">{{ profileStore.myProfile.bio }}</p>
            <p class="pl-4 text-purpleShade font-nunito text-[16px] mb-3">О себе</p>
            <p class="pl-4 font-nunito text-primary text-[16px] truncate hover:underline cursor-pointer"
               @click="copyToClipboard(profileStore.myProfile.username)">@{{ profileStore.myProfile.username }}</p>
            <p class="pl-4 text-purpleShade font-nunito text-[16px]">Имя пользователя</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {useUiStore} from "@/stores/uiStore.js";
import {useProfileStore} from "@/stores/profileStore.js";

const profileStore = useProfileStore();
const uiStore = useUiStore();

const closeProfile = () => {
  uiStore.setProfileOpen(false);
}

const openAccount = () => {
  uiStore.setAccountOpen(true);
  closeProfile();
}

const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error("Не удалось скопировать")
  }
}
</script>