import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useUiStore = defineStore('uiStore', () => {
    const menuOpen = ref(false);
    const profileOpen = ref(false);
    const accountOpen = ref(false);

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value;
    };

    const setMenuOpen = (state) => {
        menuOpen.value = state;
    }

    const setProfileOpen = (state) => {
        profileOpen.value = state;
    };

    const setAccountOpen = (state) => {
        accountOpen.value = state;
    }

    return {
        menuOpen,
        profileOpen,
        accountOpen,
        toggleMenu,
        setMenuOpen,
        setProfileOpen,
        setAccountOpen,
    };
});
