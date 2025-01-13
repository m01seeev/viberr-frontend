<template>
  <div class="w-screen h-screen bg-black bg-opacity-30 fixed z-50 inset-0 flex items-center justify-center"
       @click="closeContactProfile">
    <div class="fixed flex flex-col items-center bg-card w-1/5 h-fit z-60 border border-border rounded-xl shadow"
         @click.stop>
      <div class="flex justify-between items-center w-full h-fit px-4 pt-4 pb-2">
        <p class="text-darkPurple font-exo text-[20px]">Информация</p>
        <button class="rounded-[100%] hover:bg-lilac p-2" @click="closeContactProfile">
          <img src="/src/assets/images/close.svg" alt="">
        </button>
      </div>
      <div class="flex items-center w-full my-4 h-fit border-b-4 border-border px-4 pb-4">
        <img :src="contactStore.selectedContact.picRef" alt="" class="w-[70px] h-[70px] rounded-[100%] mr-3"/>
        <p class="text-darkPurple font-exo text-[18px] truncate">{{ contactStore.selectedContact.firstName }}
          {{ contactStore.selectedContact.lastName }}</p>
      </div>
      <div class="flex flex-col items-start w-full pl-4 pb-4">
        <div class="flex items-start w-full pr-4">
          <img src="/src/assets/images/info.svg" alt="">
          <div class="w-[90%]">
            <p class="text-darkPurple font-nunito text-[16px] pl-4 truncate">{{
                contactStore.selectedContact.email
              }}</p>
            <p class="pl-4 text-purpleShade font-nunito text-[16px] mb-3">Электронная почта</p>
            <p class="pl-4 font-nunito text-[16px] break-all">{{ contactStore.selectedContact.bio }}</p>
            <p class="pl-4 text-purpleShade font-nunito text-[16px] mb-3">О себе</p>
            <p class="pl-4 font-nunito text-primary text-[16px] hover:underline truncate cursor-pointer"
               @click="copyToClipboard(contactStore.selectedContact.username)">@{{
                contactStore.selectedContact.username
              }}</p>
            <p class="pl-4 text-purpleShade font-nunito text-[16px]">Имя пользователя</p>
          </div>
        </div>
      </div>
      <button class="w-full hover:bg-lilac mb-1 pl-[20%] py-1.5 text-[16px] font-exo text-primary flex justify-start"
              @click="openChat">ОТПРАВИТЬ СООБЩЕНИЕ
      </button>
      <button
          class="w-full hover:bg-red-300 mb-3 pl-[20%] py-1.5 text-[16px] font-exo text-darkPurple flex justify-start"
          @click="report">
        ПОЖАЛОВАТЬСЯ
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>

import {useContactStore} from "@/stores/contactStore.js";
import {useChatStore} from "@/stores/chatStore.js";

const contactStore = useContactStore();
const chatStore = useChatStore();

const report = () => {
  contactStore.setReportOpen(true);
  contactStore.setSelectContactProfile(false);
}

const openChat = () => {
  chatStore.setOpenChat(true);
  closeContactProfile();
  chatStore.setChatFromContact(contactStore.selectedContact.firstName + " " + contactStore.selectedContact.lastName, contactStore.selectedContact.username);
}

const closeContactProfile = () => {
  contactStore.setSelectContactProfile(false);
}

const copyToClipboard = async (value) => {
  try {
    await navigator.clipboard.writeText(value);
  } catch (error) {
    console.error("Не удалось скопировать")
  }
}
</script>