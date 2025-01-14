<template>
  <div class="flex flex-col items-center w-full h-full" v-if="profileStore.myProfile">
    <div class="w-full p-3 h-fit border-b border-border">
      <img :src="profileStore.myProfile.picRef" alt="" class="h-14 w-14 rounded-[100%]"/>
      <p class="mt-2 text-darkPurple text-[18px] truncate font-nunito">{{ profileStore.myProfile.username }}</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lilac cursor-pointer"
         @click="openProfile">
      <img src="/src/assets/images/profile.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Мой профиль</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lilac cursor-pointer border-b border-border"
         @click="openAccount">
      <img src="/src/assets/images/lock.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Мой аккаунт</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lilac cursor-pointer" @click="openContacts">
      <img src="/src/assets/images/contact.svg" alt="">
      <p class="text-darkPurple font-nunito ml-4 text-[16px]">Контакты</p>
    </div>
    <div class="w-full p-3 h-fit flex items-center hover:bg-lilac cursor-pointer border-b border-border" @click="downloadChats">
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
import router from "@/router.js";
import {onMounted} from "vue";
import {useUiStore} from "@/stores/uiStore.js";
import {useProfileStore} from "@/stores/profileStore.js";
import {useChatStore} from "@/stores/chatStore.js";

//Переменные
const uiStore = useUiStore();
const profileStore = useProfileStore();
const chatStore = useChatStore();

//Функции
const downloadChats = () => {
  const jsonString = JSON.stringify(chatStore.chats, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "MessagesBackUp.json";
  link.click();
  URL.revokeObjectURL(url);
  uiStore.setMenuOpen(false);
};

const fetchProfile = async () => {
  await profileStore.fetchProfile()
}

const handleLogOut = async () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("authToken");
  profileStore.setMyProfile(null);
  uiStore.setMenuOpen(false);
  chatStore.setOpenChat(false);
  chatStore.setSelectedChat(null);
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

const openContacts = () => {
  uiStore.toggleMenu();
  uiStore.setContactOpen(true);
}

//Вызовы
onMounted(fetchProfile)
</script>