<template>
  <div class="flex flex-col justify-center items-center w-full" v-if="!chatStore.openChat">
    <p class="bg-card rounded-[20px] px-4 py-0.5 text-darkPurple text-[16px] font-exo">Выберите, кому хотели бы
      написать</p>
  </div>
  <div v-else>
    <div class="flex flex-col justify-center items-start bg-card px-3 w-full h-[8%] border-b border-border">
      <p class="w-[90%] text-darkPurple text-[18px] font-exo truncate">{{ chatStore.selectedChat.name }}</p>
      <p class="w-[90%] text-primary text-[18px] font-exo truncate">@{{chatStore.selectedChat.username}}</p>
    </div>
    <div class="w-full h-[86%] flex flex-col justify-end">
      <ScrollArea ref="scrollArea">
        <div v-for="message in chatStore.selectedChat.messages"
             :class="`flex place-items-end max-w-[50%] ml-2 w-fit h-fit rounded-xl py-1 my-2 px-2 ${message.sender === userId ? 'bg-lavender' : 'bg-card'}`">
          <div class="flex place-items-end w-full" v-if="message.message !== 'Файл'">
            <p class="w-[95%] break-words font-nunito text-[14px]">{{ message.message }}</p>
            <p class="ml-1 text-purpleShade text-[12px]">{{ message.timestamp.slice(11, 16) }}</p>
          </div>
          <div class="flex place-items-end w-full" v-if="message.attachment.type === 'IMAGE'">
            <img :src="message.attachment.fileRef" class="max-w-[95%] px-2 py-2" alt="">
            <p class="ml-1 text-purpleShade text-[12px]">{{ message.timestamp.slice(11, 16) }}</p>
          </div>
          <div class="flex place-items-end w-full" v-if="message.attachment.type === 'VIDEO'">
            <p>
              <video controls width="500">
                <source :src="message.attachment.fileRef" type="video/mp4"/>
                Твой браузер не поддерживает видео.
              </video>
            </p>
            <p class="ml-1 text-purpleShade text-[12px]">{{ message.timestamp.slice(11, 16) }}</p>
          </div>
          <div class="flex place-items-end w-full" v-if="message.attachment.type === 'AUDIO'">
            <p>
              <audio controls>
                <source :src="message.attachment.fileRef" type="audio/mpeg" />
                Твой браузер не поддерживает аудио.
              </audio>
            </p>
            <p class="ml-1 text-purpleShade text-[12px]">{{ message.timestamp.slice(11, 16) }}</p>
          </div>
        </div>
        <ScrollBar orientation="vertical" class="bg-lavender"/>
      </ScrollArea>
    </div>
    <div class="w-full h-[6%] bg-card flex items-center px-4">
      <svg width="30" height="30" viewBox="0 0 512 512" class="group/attach cursor-pointer" @click="triggerFileInput">
        <path
            d="M 256.500 22.842 C 250.675 26.631, 35.408 243.260, 29.776 251 C 15.655 270.406, 7.129 290.125, 2.321 314.500 C -0.368 328.134, -0.078 355.984, 2.899 370 C 5.964 384.429, 10.189 396.629, 16.318 408.746 C 36.540 448.728, 73.083 477.309, 117.403 487.807 C 127.554 490.211, 130.333 490.438, 150 490.468 C 167.058 490.493, 173.256 490.126, 180 488.688 C 200.468 484.323, 221.502 475.182, 238.302 463.350 C 249.029 455.795, 480.888 224.822, 490.460 212.156 C 517.365 176.555, 518.930 127.565, 494.353 90.308 C 488.875 82.005, 475.076 67.991, 466.684 62.208 C 430.821 37.499, 385.275 37.076, 348 61.107 C 339.942 66.301, 105.935 299.473, 100.266 307.956 C 98.261 310.957, 95.298 317.247, 93.682 321.935 C 91.207 329.116, 90.740 332.035, 90.718 340.479 C 90.673 357.682, 96.317 371.353, 108.484 383.510 C 126.834 401.845, 154.127 406.100, 178 394.346 C 185.232 390.786, 189.420 386.741, 295.278 281.077 C 383.148 193.367, 405.275 170.771, 406.157 167.846 C 409.471 156.856, 399.645 146.486, 388.333 149.038 C 385.202 149.744, 368.781 165.730, 276.083 258.317 C 170.955 363.318, 167.309 366.839, 161.500 368.974 C 142.971 375.785, 123.674 364.178, 120.513 344.321 C 119.628 338.761, 122.174 329.042, 125.918 323.687 C 131.141 316.217, 358.918 89.706, 365.500 85.437 C 386.514 71.809, 414.848 69.656, 437.576 79.962 C 472.630 95.856, 490.148 135.852, 477.984 172.223 C 471.734 190.910, 477.122 185.034, 347.610 314.412 C 271.375 390.567, 226.752 434.417, 221.604 438.234 C 206.835 449.184, 186.932 457.292, 168.038 460.055 C 155.314 461.915, 132.770 460.792, 121 457.710 C 99.247 452.015, 79.754 440.691, 64.453 424.860 C 54.061 414.108, 48.713 406.617, 42.601 394.250 C 23.372 355.345, 26.355 310.486, 50.621 273.635 C 56.736 264.349, 66.489 254.284, 167.035 153.500 C 227.393 93, 277.276 42.517, 277.888 41.316 C 280.521 36.143, 278.700 28.845, 273.581 24.063 C 269.961 20.680, 260.826 20.027, 256.500 22.842"
            stroke="none" class="fill-purpleShade group-hover/attach:fill-primary" fill-rule="evenodd"/>
      </svg>
      <textarea ref="textareaRef" v-model="text" @input="handleInput" rows="1" placeholder="Написать сообщение..."
                class="text-[16px] resize-none w-[90%] font-nunito outline-none bg-card pl-4 py-2 overflow-hidden">
        
      </textarea>
      <svg width="30" height="30" viewBox="0 0 512 512" class="group/send cursor-pointer ml-5" @click="sendMessage">
        <path
            d="M 37 37.433 C 21.279 41.814, 8.327 54.244, 2.949 70.113 C 1.101 75.566, 0.862 77.963, 1.316 86.500 C 1.784 95.279, 4.347 106.240, 22.302 176.250 L 42.756 256 22.302 335.750 C 4.347 405.760, 1.784 416.721, 1.316 425.500 C 0.862 434.037, 1.101 436.434, 2.949 441.887 C 7.448 455.162, 16.800 465.629, 29.587 471.702 C 36.090 474.790, 38.413 475.353, 46.377 475.769 C 53.304 476.131, 57.096 475.823, 61.515 474.539 C 69.297 472.276, 477.508 302.884, 486.304 298.267 C 497.488 292.396, 507.154 279.972, 509.940 267.885 C 511.239 262.250, 511.239 249.750, 509.940 244.115 C 507.154 232.028, 497.488 219.604, 486.304 213.733 C 478.020 209.384, 69.723 39.878, 62.068 37.610 C 55.689 35.719, 43.459 35.633, 37 37.433 M 40.121 67.113 C 33.822 70.312, 29.995 76.685, 30.016 83.946 C 30.027 87.842, 35.785 112.040, 49.305 165 L 68.578 240.500 145.039 241 C 219.227 241.485, 221.601 241.559, 224.895 243.500 C 230.203 246.626, 232.500 250.402, 232.500 256 C 232.500 261.598, 230.203 265.374, 224.895 268.500 C 221.601 270.441, 219.227 270.515, 145.039 271 L 68.578 271.500 49.305 347 C 35.785 399.960, 30.027 424.158, 30.016 428.054 C 29.995 435.528, 33.848 441.780, 40.442 444.972 C 49.851 449.527, 37.197 454.325, 263 360.584 C 376.575 313.434, 471.369 273.770, 473.654 272.442 C 484.878 265.919, 484.878 246.081, 473.654 239.558 C 471.369 238.230, 376.575 198.563, 263 151.408 C 35.840 57.095, 49.602 62.300, 40.121 67.113"
            stroke="none" class="fill-purpleShade group-hover/send:fill-primary" fill-rule="evenodd"/>
      </svg>
    </div>
    <input type="file" id="hidden-file-input" accept="*" @change="handleFileChange"
           class="hidden">
  </div>
</template>

<style scoped>

</style>
<script setup>
import {useChatStore} from "@/stores/chatStore.js";
import {ref} from "vue";
import api from "@/api.js";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area/index.js";
import {cloudinaryConfig} from "@/cloudinary.js";

const chatStore = useChatStore();
const text = ref("");
const textareaRef = ref(null);
const userId = localStorage.getItem("userId");
const scrollArea = ref(null);
const upload = cloudinaryConfig;
const fileUrl = ref("");
const fileType = ref("");

const uploadFile = async (file) => {
  const formData = new FormData();
  const type = file.type;
  {
    if (type.startsWith("image/")) {
      fileType.value = "IMAGE";
    } else if (type.startsWith("video/")) {
      fileType.value = "VIDEO";
    } else if (type.startsWith("audio/")) {
      fileType.value = "AUDIO";
    } else {
      fileType.value = "OTHER";
    }
  }
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
      await sendAttachment();
    } else {
      throw new Error("Ошибка загрузки файла.");
    }
  } catch (err) {
    console.error(err);
  }
};

const sendAttachment = async () => {
  try {
    await api.post(`/api/attachments/${userId}`, {
      type: fileType.value,
      fileRef: fileUrl.value,
      username: chatStore.selectedChat.username,
    })
  } catch (error) {
    console.log(error)
  }
  await chatStore.fetchChats();
  chatStore.setSelectedChat(chatStore.chats[0])
}

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    await uploadFile(file)
  }
}

const triggerFileInput = () => {
  document.getElementById("hidden-file-input").click();
}

const sendMessage = async () => {
  if (text.value !== "") {
    try {
      await api.post(`api/messages/${userId}`, {
        username: chatStore.selectedChat.username,
        message: text.value,
      })
    } catch (error) {
      console.log(error)
    }
    text.value = "";
    await chatStore.fetchChats();
    chatStore.setSelectedChat(chatStore.chats[0])
  }
}

const handleInput = (event) => {
  const textarea = textareaRef.value;
  const scrollHeight = textarea.scrollHeight;
  const currentRows = Math.floor(scrollHeight / 24);
  textarea.style.height = `${textarea.scrollHeight}px`
  if (currentRows > 1) {
    textarea.style.height = `40px`
    text.value = text.value.slice(0, -1);
  }
}

const closeChat = () => {
  chatStore.setOpenChat(false);
  chatStore.setSelectedChat(null);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeChat();
  }
  if (event.key === "Enter") {
    sendMessage();
  }
});
</script>