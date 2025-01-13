<template>
  <div class="w-screen h-screen bg-black bg-opacity-30 fixed z-50 inset-0 flex items-center justify-center"
       @click="closeContacts">
    <div class="fixed flex flex-col items-center bg-card w-1/5 h-fit z-60 border border-border rounded-xl shadow"
         @click.stop>
      <p class="w-full flex justify-start p-4 font-exo text-darkPurple text-[20px]">Новый контакт</p>
      <p class="w-full flex justify-start font-nunito px-4 text-darkPurple text-[16px]"
         :class="{'text-primary': activeEntry}">Логин или почта</p>
      <div class="px-4 w-full">
        <input type="email" @focus="toggleEntry" @blur="toggleEntry" v-model="usernameOrEmail"
               class="w-full bg-card border-b border-border text-[18px] outline-none focus:border-primary focus:border-b-2">
      </div>
      <p class="text-red-500 text-[14px] w-full px-4 font-nunito flex justify-start" v-if="showAlert">{{alert}}</p>
      <div class="flex justify-end text-darkPurple text[16px] font-exo w-full px-4 pb-3"
      :class="{'mt-1': showAlert, 'mt-6':!showAlert}">
        <button class="rounded-md hover:bg-lilac px-3 py-1.5" @click="rejectAddContact">Отмена</button>
        <button class="rounded-md hover:bg-lilac px-3 py-1.5" @click="addContact">Добавить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

<script setup>
import {ref} from "vue";
import {useUiStore} from "@/stores/uiStore.js";
import api from "@/api.js";

const uiStore = useUiStore();
const activeEntry = ref(null);
const usernameOrEmail = ref("");
const showAlert = ref(false);
const alert = ref("");

const closeContacts = () => {
  uiStore.setContactOpen(false);
  uiStore.setContactAdd(false);
}

const toggleEntry = () => {
  activeEntry.value = !activeEntry.value;
}

const rejectAddContact = () => {
  uiStore.setContactAdd(false);
  uiStore.setContactOpen(true);
}

const addContact = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await api.post(`/api/users/addContact/${userId}`, {
      "email": usernameOrEmail.value,
      "username": usernameOrEmail.value,
    })
    if (response.data !== "Контакт добавлен") {
      alert.value = response.data;
      showAlert.value = true;
    } else {
      rejectAddContact();
    }
  } catch (error) {
    console.log(error)
  }
}
</script>