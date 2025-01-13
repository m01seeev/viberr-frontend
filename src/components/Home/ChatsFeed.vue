<template>
  <div class="focus:outline-none" tabindex="-1">
    <ScrollArea class="focus:outline-none">
      <div v-for="chat in chatStore.chats" :key="chat.name" @click="openChat(chat)" tabindex="-1"
           :class="{'bg-primary hover:bg-primary': chatStore.selectedChat === chat}"
           class="focus:outline-none py-2 px-2 flex items-center w-full justify-start hover:bg-lilac cursor-pointer">
        <img :src="chat.picRef" class="w-[50px] rounded-[100%] h-[50px]" alt="">
        <div class="focus:outline-none flex flex-col w-[75%] items-start ml-3 text-[14px] font-nunito" tabindex="-1">
          <div class="focus:outline-none flex items-center justify-start w-full gap-2" tabindex="-1">
            <p class="truncate w-full text-darkPurple"
               :class="{'text-primary-foreground': chatStore.selectedChat === chat}">{{ chat.name }}</p>
            <p :class="`${chatStore.selectedChat === chat ? 'text-primary-foreground' : 'text-purpleShade'}`">
              {{ chat.lastUpdate }}</p>
          </div>
          <p :class="`mt-1 truncate w-full ${chatStore.selectedChat === chat ? 'text-primary-foreground' : 'text-purpleShade'}`"
             v-if="chat.messages.at(-1)?.message !== ''">
            {{ chat.messages.at(-1).message }}</p>
        </div>
      </div>
      <ScrollBar orientation="vertical"/>
    </ScrollArea>
  </div>
</template>

<style scoped>

</style>
<script setup>
import {useChatStore} from "@/stores/chatStore.js";
import {onMounted} from "vue";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area/index.js";

const chatStore = useChatStore();
const word = "Файл";

const fetchChats = () => {
  chatStore.fetchChats();
}

const openChat = (chat) => {
  chatStore.setSelectedChat(chat);
  chatStore.setOpenChat(true);
}
onMounted(fetchChats);
</script>
