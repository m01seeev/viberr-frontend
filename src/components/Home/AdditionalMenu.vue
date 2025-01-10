<template>
  <div class="flex flex-col items-center w-full h-full" v-if="profileStore.myProfile">
    <div class="w-full p-3 h-fit border-b border-border">
      <img src="/src/assets/images/ava.jpg" alt="" class="h-14 w-14 rounded-[100%]"/>
      <p class="mt-2 text-darkPurple text-[18px] truncate font-nunito">{{ profileStore.myProfile.username }}</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lavender cursor-pointer"
         @click="openProfile">
      <img src="/src/assets/images/profile.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Мой профиль</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lavender cursor-pointer border-b border-border"
         @click="openAccount">
      <img src="/src/assets/images/lock.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Мой аккаунт</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lavender cursor-pointer">
      <img src="/src/assets/images/contact.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Контакты</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lavender cursor-pointer border-b border-border">
      <img src="/src/assets/images/backup.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Сохранить сообщения</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-red-300 cursor-pointer" @click="handleLogOut">
      <img src="/src/assets/images/logout.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Выйти</p>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
//Импорты
import api from "@/api.js";
import router from "@/router.js";
import {onMounted} from "vue";
import {useUiStore} from "@/stores/uiStore.js";
import {useProfileStore} from "@/stores/profileStore.js";

//Переменные
const uiStore = useUiStore();
const profileStore = useProfileStore();

//Функции
const fetchProfile = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await api.get(`/api/profiles/${userId}`)
    profileStore.setMyProfile(response.data);
  } catch (error) {
    console.log(error);
  }
}

const handleLogOut = async () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("authToken");
  profileStore.setMyProfile(null);
  await router.push('/signin');
}

const openProfile = () => {
  uiStore.toggleMenu();
  uiStore.setProfileOpen(true);
}

const openAccount = () => {
  uiStore.setMenuOpen(false);
  uiStore.setAccountOpen(true);
}

//Вызовы
onMounted(fetchProfile)
</script>