<template>
  <div class="back w-screen h-screen">
    <div v-if="reportStore.length===0" class="h-full w-full">
      <div class="flex justify-between flex-col items-center h-[50%]">
        <button
            class="mt-3 cursor-pointer bg-red-300 hover:bg-red-400 py-1 px-3 text-[18px] text-darkPurple font-exo rounded-md"
            @click="handleLogOut">
          Выйти
        </button>
        <p class="text-darkPurple text-[20px] bg-card rounded-xl py-1 px-4 font-exo">Жалоб нет</p>
      </div>
    </div>
    <div v-else class="flex flex-col items-center h-full">
      <button
          class="mt-3 cursor-pointer bg-red-300 hover:bg-red-400 py-1 px-3 text-[18px] text-darkPurple font-exo rounded-md"
          @click="handleLogOut">Выйти
      </button>
      <div class="h-[90%] w-full">
        <ScrollArea class="w-full h-full flex flex-col items-center px-[10%]">
          <div v-for="report in reportStore.reports"
               class="w-full h-fit bg-card border border-border p-2 shadow my-3 rounded-xl flex flex-col items-start">
            <p class="text-[20px] font-exo text-darkPurple">Жалоба</p>
            <div class="flex justify-start mt-2 w-full">
              <img :src="report.picRef" alt="" class="h-[200px] w-[200px] rounded-md">
              <div class="flex flex-col w-[60%] justify-start ml-4">
                <p class="text-[20px] font-exo text-darkPurple truncate">{{ report.name }}</p>
                <p class="text-[20px] font-exo text-primary mb-6 truncate">@{{ report.username }}</p>
                <p class="text-[20px] font-exo text-darkPurple">Жалоба от:</p>
                <p class="text-[20px] font-exo text-darkPurple truncate">{{report.fromName}}</p>
                <p class="text-[20px] font-exo text-primary mb-6 truncate">@{{report.fromUsername}}</p>
                <p class="text-[20px] font-exo text-darkPurple">Причина жалобы:</p>
                <p class="text-[16px] font-nunito text-darkPurple break-words">{{ report.reason }}</p>
              </div>
              <div class="flex flex-col w-[20%] justify-start ml-4">
                <button class="bg-green-500 rounded-xl text-[18px] text-card py-4 mb-6 hover:bg-green-400"
                        @click="approve(report.userId, report.username, report.fromUsername)">Одобрить
                </button>
                <button class="bg-red-500 rounded-xl text-[18px] text-card py-4 hover:bg-red-400"
                        @click="decline(report.username, report.fromUsername)">Отклонить
                </button>
              </div>
            </div>
          </div>
          <ScrollBar orientation=" vertical
            "/>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back {
  background: linear-gradient(110deg, hsl(var(--background)), var(--light-purple));
}
</style>
<script setup>
import {useReportStore} from "@/stores/reportStore.js";
import {onMounted} from "vue";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area/index.js";
import api from "@/api.js";
import router from "@/router.js";

const reportStore = useReportStore();

const fetchReports = () => {
  reportStore.fetchReports();
}

const decline = async (username, fromUsername) => {
  try {
    await api.put("/api/reports", {
      username: username,
      fromUsername: fromUsername,
    })
    fetchReports();
  } catch (error) {
    console.log(error);
  }
}

const approve = async (userId, username, fromUsername) => {
  try {
    await api.put(`/api/users/${userId}`, {
      isDeleted: "YES"
    })
    await decline(username, fromUsername)
  } catch (error) {
    console.log(error)
  }
}

const handleLogOut = async () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("authToken");
  await router.push('/signin');
}

onMounted(fetchReports)
</script>