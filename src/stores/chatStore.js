import {defineStore} from "pinia";
import {ref} from "vue";
import api from "@/api.js";

export const useChatStore = defineStore('ChatStore', () => {
    const chats = ref(null);
    const selectedChat = ref(null);
    const openChat = ref(false);

    const setSelectedChat = (data) => {
        selectedChat.value = data;
    }

    const fetchChats = async () => {
        const userId = localStorage.getItem("userId");
        try {
            const response = await api.get(`api/chats/${userId}`)
            chats.value = response.data;
            console.log(chats.value)
        } catch (error) {
            console.log(error)
        }
    }

    const setChatFromContact = (contactName, username) => {
        const chat = chats.value.find((c) => c.username === username);
        if (chat) {
            selectedChat.value = chat;
        } else {
            selectedChat.value = {
                name: contactName,
                username: username,
            };
        }
        console.log(selectedChat.value)
    }

    const setOpenChat = (state) => {
        openChat.value = state;
    }

    return {
        fetchChats,
        setChatFromContact,
        openChat,
        setOpenChat,
        selectedChat,
        setSelectedChat,
        chats,
    }
})