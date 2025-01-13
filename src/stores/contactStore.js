import {ref} from "vue";
import {defineStore} from "pinia";
import api from "@/api.js";

export const useContactStore = defineStore('contactStore', () => {
    const contacts = ref(null);
    const selectedContact = ref(null);
    const selectContactProfile = ref(false);
    const reportOpen = ref(false);

    const setReportOpen = (state) => {
        reportOpen.value = state;
    }

    const fetchContacts = async () => {
        const userId = localStorage.getItem("userId");
        try {
            const response = await api.get(`/api/users/contacts/${userId}`);
            contacts.value = response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const setSelectedContact = (data) => {
        selectedContact.value = data;
    }

    const setSelectContactProfile = (state) => {
        selectContactProfile.value = state;
    }

    return {
        reportOpen,
        setReportOpen,
        contacts,
        selectedContact,
        selectContactProfile,
        fetchContacts,
        setSelectedContact,
        setSelectContactProfile,
    }
})