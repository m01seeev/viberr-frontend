<template>
  <div class="w-screen h-screen bg-black bg-opacity-30 fixed z-50 inset-0 flex items-center justify-center"
       @click="closeEmail">
    <div class="fixed flex flex-col items-center bg-card w-[22%] h-fit z-60 border border-border rounded-xl shadow"
         @click.stop>
      <div class="flex justify-start items-center font-exo text-darkPurple text-[20px] w-full p-4 pb-0">
        <p>Электронная почта</p>
      </div>
      <div class="flex flex-col items-start w-full px-4 font-nunito text-[16px] mb-3" :class="{'mb-[11px]': emailActive}">
        <p :class="{'text-purpleShade': !emailActive, 'text-primary': emailActive}">Почта</p>
        <input type="email" @focus="toggleEmail" @blur="toggleEmail" v-model="email"
               class="w-full bg-card border-b border-border text-[18px] outline-none focus:border-primary focus:border-b-2">
      </div>
      <div class="flex justify-end items-center w-full px-4 gap-2 text-[16px] font-exo text-primary mb-3">
        <button class="rounded-md hover:bg-lilac py-1.5 px-3" @click="closeEmail">Отмена</button>
        <button class="rounded-md hover:bg-lilac py-1.5 px-3" @click="updateEmail">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {useUiStore} from "@/stores/uiStore.js";
import {ref} from "vue";
import api from "@/api.js";
import {useProfileStore} from "@/stores/profileStore.js";

const uiStore = useUiStore();
const profileStore = useProfileStore();
const emailActive = ref(false);
const email = ref(profileStore.myProfile.email);

const toggleEmail = () => {
  emailActive.value = !emailActive.value;
}

const closeEmail = () => {
  uiStore.toggleEmail();
}

const updateEmail = async () => {
  try {
    const userId = localStorage.getItem("userId")
    await api.put(`/api/users/${userId}`, {
      email: email.value,
    })
    await profileStore.fetchProfile();
    closeEmail();
  } catch (error) {
    console.log(error)
  }
}
</script>
