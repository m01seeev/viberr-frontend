<template>
  <div class="w-screen h-screen bg-black bg-opacity-30 fixed z-50 inset-0 flex items-center justify-center"
       @click="closeReport">
    <div class="fixed flex flex-col items-center bg-card w-[22%] h-fit z-60 border border-border rounded-xl shadow"
         @click.stop>
      <div class="flex justify-start items-center font-exo text-darkPurple text-[20px] w-full p-4 pb-0">
        <p>Пожаловаться</p>
      </div>
      <div class="flex flex-col items-start w-full px-4 font-nunito text-[16px] mb-3"
           :class="{'mb-[11px]': reasonActive}">
        <p :class="{'text-purpleShade': !reasonActive, 'text-primary': reasonActive}">Причина</p>
        <input type="email" @focus="toggleReason" @blur="toggleReason" v-model="reason"
               class="w-full bg-card border-b border-border text-[18px] outline-none focus:border-primary focus:border-b-2">

      </div>
      <div class="flex justify-end items-center w-full px-4 gap-2 text-[16px] font-exo text-primary mb-3">
        <button class="rounded-md hover:bg-lilac py-1.5 px-3" @click="closeReport">Отмена</button>
        <button class="rounded-md hover:bg-lilac py-1.5 px-3" @click="sendReport">Отправить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {useContactStore} from "@/stores/contactStore.js";
import {ref} from "vue";
import api from "@/api.js";

const contactStore = useContactStore();
const reason = ref("");
const reasonActive = ref(false);
const error = ref("");

const toggleReason = () => {
  reasonActive.value = !reasonActive.value;
}

const closeReport = () => {
  contactStore.setReportOpen(false)
}

const sendReport = async () => {
  const userId = localStorage.getItem("userId");
  const contact = contactStore.selectedContact.username;
  try {
    const response = await api.post(`/api/reports/${userId}`, {
      username: contact,
      reason: reason.value,
    })
    if (response.data === "Жалоба отправлена") {
      closeReport();
    } else {
      error.value = response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
</script>
