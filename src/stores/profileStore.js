import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from "@/api.js";

export const useProfileStore = defineStore('profileStore', () => {
    const myProfile = ref(null);

    const setMyProfile = (data) => {
        myProfile.value = data;
    }

    const fetchProfile = async () => {
        const userId = localStorage.getItem("userId");
        try {
            const response = await api.get(`/api/profiles/${userId}`)
            myProfile.value = (response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        myProfile,
        setMyProfile,
        fetchProfile,
    }
});
