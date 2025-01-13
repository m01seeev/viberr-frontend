<template>
  <div class="w-screen h-screen bg-black bg-opacity-30 fixed z-50 inset-0 flex items-center justify-center"
       @click="closeContacts">
    <div class="fixed flex flex-col items-center bg-card w-1/5 h-1/2 z-60 border border-border rounded-xl shadow"
         @click.stop>
      <div class="flex justify-between items-center w-full h-fit px-4 pt-4 pb-2 border-b border-border">
        <p class="text-darkPurple font-exo text-[20px]">Контакты</p>
      </div>
      <ScrollArea class="w-full h-4/5 bg-card border-b border-border">
        <div v-for="contact in contactStore.contacts" :key="contact.username" @click="openContactProfile(contact)"
             class="w-full flex justify-start items-center hover:bg-lilac py-1 cursor-pointer">
          <img :src="contact.picRef" alt="" class=" w-[50px] h-[50px] rounded-[100%] ml-4">
          <div class="flex flex-col items-start justify-start mx-3 w-[70%]">
            <p class="truncate w-full text-darkPurple text-[16px] font-nunito">{{contact.firstName}} {{contact.lastName}}</p>
            <p class="truncate w-full text-darkPurple text-[16px] font-nunito">{{contact.email}}</p>
          </div>
        </div>
        <ScrollBar orientation="vertical"/>
      </ScrollArea>
      <div class="flex justify-between items-center w-full px-4 text-[16px] font-exo text-darkPurple py-2">
        <button class="rounded-md hover:bg-lilac px-3 py-1.5" @click="openAddContact">Добавить контакт</button>
        <button class="rounded-md hover:bg-lilac px-3 py-1.5" @click="closeContacts">Закрыть</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {useUiStore} from "@/stores/uiStore.js";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area/index.js";
import {useContactStore} from "@/stores/contactStore.js";
import {onMounted} from "vue";

const uiStore = useUiStore();
const contactStore = useContactStore();

const openContactProfile = (data) => {
  contactStore.setSelectedContact(data);
  contactStore.setSelectContactProfile(true);
  closeContacts();
}

const fetchContacts = async () => {
  await contactStore.fetchContacts();
}

const closeContacts = () => {
  uiStore.setContactOpen(false);
}

const openAddContact = () => {
  uiStore.setContactAdd(true);
  uiStore.setContactOpen(false);
}

onMounted(fetchContacts)
</script>
