import {defineStore} from "pinia";
import {ref} from "vue";
import api from "@/api.js";

export const useReportStore = defineStore('reportStore', () => {
    const reports = ref(null);
    const length = ref(0);

    const fetchReports = async() => {
        try {
            const response = await api.get("/api/reports");
            reports.value = response.data;
            length.value = reports.value.length;
            console.log(reports.value)
        } catch (error) {
            console.log(error);
        }
    }
    return{
        length,
        reports,
        fetchReports,
    }
})