import {defineStore} from 'pinia';
import {ref} from 'vue';

export const useUiStore = defineStore('uiStore', () => {
    const menuOpen = ref(false);
    const profileOpen = ref(false);
    const accountOpen = ref(false);
    const nameEdit = ref(false);
    const emailEdit = ref(false);
    const contactOpen = ref(false);
    const addContact = ref(false);

    const setContactAdd = (state) => {
        addContact.value = state;
    }

    const toggleMenu = () => {
        menuOpen.value = !menuOpen.value;
    };

    const setMenuOpen = (state) => {
        menuOpen.value = state;
    };

    const setProfileOpen = (state) => {
        profileOpen.value = state;
    };

    const setAccountOpen = (state) => {
        accountOpen.value = state;
    };

    const setContactOpen = (state) => {
        contactOpen.value = state;
    }

    const toggleName = () => {
        nameEdit.value = !nameEdit.value;
    }

    const toggleEmail = () => {
        emailEdit.value = !emailEdit.value;
    }

    return {
        menuOpen,
        profileOpen,
        accountOpen,
        contactOpen,
        nameEdit,
        emailEdit,
        toggleMenu,
        setMenuOpen,
        setProfileOpen,
        setAccountOpen,
        toggleName,
        toggleEmail,
        setContactOpen,
        addContact,
        setContactAdd,
    };
});
