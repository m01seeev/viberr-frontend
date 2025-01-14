<template>
  <div class="w-screen h-screen bg-black bg-opacity-30 fixed z-50 inset-0 flex items-center justify-center"
       @click="closeAccount">
    <div class="fixed flex flex-col items-center bg-card w-1/5 h-fit z-60 border border-border rounded-xl shadow"
         @click.stop>
      <div class="flex justify-between items-center w-full h-fit pr-3 pl-4 pt-4 pb-2">
        <p class="text-darkPurple font-exo text-[20px]">Мой аккаунт</p>
        <button class="rounded-[100%] hover:bg-lilac p-2" @click="closeAccount">
          <img src="/src/assets/images/close.svg" alt="">
        </button>
      </div>
      <div class="flex flex-col items-center w-full">
        <div class="relative w-[90px] h-[90px]">
          <img
              :src="profileStore.myProfile.picRef"
              alt="Аватар"
              class="w-full h-full rounded-[100%] object-cover"/>
          <div @click="triggerFileInput"
               class="absolute bottom-0 right-0 w-[40px] h-[40px] bg-primary hover:bg-primary-hover rounded-[100%] flex items-center justify-center cursor-pointer">
            <img src="/src/assets/images/photo.svg" alt="Загрузить фото" class="w-6 h-6"/>
          </div>
        </div>
        <p class="text-darkPurple text-[18px] font-exo max-w-full px-4 truncate">{{ profileStore.myProfile.firstName }}
          {{ profileStore.myProfile.lastName }}</p>
        <div class="flex justify-between w-full pr-3">
          <textarea v-model="inputValue" @keydown="handleEnterDisable" maxlength="70" rows="3" placeholder="О себе"
                    class="w-[90%] font-nunito text-darkPurple resize-none overflow-hidden text-[16px] pl-4 mr-2 bg-card outline-none">
          </textarea>
          <p class="font-exo text-[16px] text-purpleShade">{{ 70 - inputValue.length }}</p>
        </div>
        <p class="bg-lilac w-full text-[14px] text-purpleShade font-nunito px-3 py-1 mt-1">Любая информация, например:
          возраст, род деятельности, место работы или город.</p>
        <div @click="openName"
            class="flex justify-between font-nunito text-[16px] items-center text-darkPurple w-full px-3 mt-3 hover:bg-lilac py-2 cursor-pointer">
          <div class="flex justify-start w-[30%] items-center gap-3">
            <img src="/src/assets/images/profile.svg" alt="">
            <p>Имя</p>
          </div>
          <p class="w-[60%] truncate text-end text-primary">{{ profileStore.myProfile.firstName }}
            {{ profileStore.myProfile.lastName }}</p>
        </div>
        <div @click="openEmail"
            class="flex justify-between font-nunito text-[16px] items-center text-darkPurple w-full px-3 hover:bg-lilac py-2 cursor-pointer">
          <div class="flex justify-start w-[30%] items-center gap-3">
            <img src="/src/assets/images/email.svg" alt="">
            <p>Почта</p>
          </div>
          <p class="w-[60%] truncate text-end text-primary">{{ profileStore.myProfile.email }}</p>
        </div>
        <p class="bg-lilac w-full text-[14px] text-purpleShade font-nunito px-3 py-1 my-3">С помощью этих данных другие
          пользователи смогут связаться с вами.</p>
      </div>
    </div>
  </div>
  <input type="file" id="hidden-file-input" accept="image/*" @change="handleFileChange"
         class="hidden">
</template>

<style scoped>

</style>
<script setup>
import {useUiStore} from "@/stores/uiStore.js";
import {useProfileStore} from "@/stores/profileStore.js";
import {ref} from "vue";
import {cloudinaryConfig} from "@/cloudinary.js";
import api from "@/api.js";

const uiStore = useUiStore();
const profileStore = useProfileStore();
const upload = cloudinaryConfig;
const inputValue = ref(profileStore.myProfile.bio);
const fileUrl = ref(profileStore.myProfile.picRef);

const closeAccount = () => {
  uiStore.setAccountOpen(false);
  updatePicAndBio();
};

const openName = () => {
  uiStore.toggleName();
}

const openEmail = () => {
  uiStore.toggleEmail();
}

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload.uploadPreset);
  try {
    const response = await fetch(upload.uploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.secure_url) {
      fileUrl.value = data.secure_url;
      await updatePicAndBio();
    } else {
      throw new Error("Ошибка загрузки файла.");
    }
  } catch (err) {
    alert("Загрузите изображение")
    console.error(err);
  }
};

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await uploadFile(file)
  }
}

const triggerFileInput = () => {
  document.getElementById("hidden-file-input").click();
}

const updatePicAndBio = async () => {
  try {
    const userId = localStorage.getItem("userId")
    await api.put(`/api/users/${userId}`, {
      picRef: fileUrl.value,
      bio: inputValue.value,
    })
    await profileStore.fetchProfile();
  } catch (error) {
    console.log(error)
  }
}

const handleEnterDisable = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};
</script>