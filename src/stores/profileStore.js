import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProfileStore = defineStore('profileStore', () => {
    const myProfile = ref(null);

    const setMyProfile = (data) => {
        myProfile.value = data;
    }
    return {
        myProfile,
        setMyProfile,
    }
});
