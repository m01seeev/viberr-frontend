<template>
  <div class="back flex w-screen h-screen">
    <div class="left-part flex flex-col h-full w-1/6">
      <div class="flex items-center px-3 h-[8%] justify-between w-full">
        <button class="group/additional h-1/3" @click="toggleMenu">
          <svg width="30" height="18" viewBox="0 0 45 37"
               class="group-hover/additional:fill-primary-hover fill-primary">
            <rect y="16.2639" width="45" height="4" rx="2"/>
            <rect width="45" height="4" rx="2"/>
            <rect y="32.5278" width="45" height="4" rx="2"/>
          </svg>
        </button>
        <p class="text-[20px] text-primary font-exo">Чаты</p>
        <svg width="18" height="18" viewBox="0 0 512 512" class="group/plus cursor-pointer" @click="openContacts">
          <path d="M 244.919 1.833 C 237.645 3.732, 228.532 8.814, 224.044 13.474 C 219.130 18.576, 214.197 27.840, 212.559 35.041 C 211.213 40.957, 211 53.467, 211 126.447 L 211 211 126.447 211 C 32.498 211, 33.580 210.932, 22.343 217.570 C 11.022 224.258, 3.338 235.528, 0.937 248.966 C -2.190 266.463, 6.599 285.129, 22.343 294.430 C 33.580 301.068, 32.498 301, 126.447 301 L 211 301 211 385.553 C 211 479.502, 210.932 478.420, 217.570 489.657 C 224.258 500.978, 235.528 508.662, 248.966 511.063 C 266.463 514.190, 285.129 505.401, 294.430 489.657 C 301.068 478.420, 301 479.502, 301 385.553 L 301 301 386.250 300.942 C 463.498 300.890, 472.118 300.723, 478.081 299.167 C 485.355 297.268, 494.468 292.186, 498.956 287.526 C 503.647 282.655, 508.813 273.213, 510.112 267.135 C 510.775 264.036, 511.695 261.073, 512.158 260.550 C 513.286 259.277, 513.242 249.732, 512.112 250.431 C 511.624 250.733, 510.925 248.983, 510.559 246.543 C 508.977 235.992, 500.165 223.778, 489.657 217.570 C 478.420 210.932, 479.502 211, 385.553 211 L 301 211 300.942 125.750 C 300.890 48.502, 300.723 39.882, 299.167 33.919 C 297.268 26.645, 292.186 17.532, 287.526 13.044 C 282.424 8.130, 273.160 3.197, 265.959 1.559 C 257.385 -0.391, 253.233 -0.337, 244.919 1.833 M 0.300 256 C 0.300 259.025, 0.487 260.262, 0.716 258.750 C 0.945 257.238, 0.945 254.762, 0.716 253.250 C 0.487 251.738, 0.300 252.975, 0.300 256"
                stroke="none" class="fill-primary group-hover/plus:fill-primary-hover" fill-rule="evenodd"/>
        </svg>
      </div>
      <ChatsFeed class="w-full"></ChatsFeed>
      <div
          v-if="uiStore.menuOpen"
          @click="toggleMenu"
          class="fixed inset-0 bg-black bg-opacity-30 transition-opacity duration-300 z-40"
      ></div>
      <div
          class="back fixed top-0 left-0 w-64 h-full text-dark-purple shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
          :class="{'-translate-x-full': !uiStore.menuOpen, 'translate-x-0': uiStore.menuOpen}">
        <AdditionalMenu></AdditionalMenu>
      </div>
    </div>
    <div class="right-part flex h-full w-5/6 border-l border-border">
      <MessagesFeed class="w-full"></MessagesFeed>
    </div>
  </div>
  <Profile v-if="uiStore.profileOpen"></Profile>
  <Account v-if="uiStore.accountOpen"></Account>
  <Name v-if="uiStore.nameEdit"></Name>
  <Email v-if="uiStore.emailEdit"></Email>
  <Contacts v-if="uiStore.contactOpen"></Contacts>
  <AddContact v-if="uiStore.addContact"></AddContact>
  <ContactProfile v-if="contactStore.selectContactProfile"></ContactProfile>
  <Report v-if="contactStore.reportOpen"></Report>
</template>

<style scoped>
.back {
  background: linear-gradient(110deg, hsl(var(--background)), hsl(var(--card)));
}

.right-part {
  background: linear-gradient(
      -70deg, var(--lavender), var(--lilac), var(--light-purple));
}
</style>

<script setup>
import AdditionalMenu from "@/components/Home/AdditionalMenu.vue";
import Profile from "@/components/Home/Menu/Profile.vue";
import Account from "@/components/Home/Menu/Account/Account.vue";
import {useUiStore} from "@/stores/uiStore.js";
import Name from "@/components/Home/Menu/Account/Name.vue";
import Email from "@/components/Home/Menu/Account/Email.vue";
import Contacts from "@/components/Home/Menu/Contact/Contacts.vue";
import AddContact from "@/components/Home/Menu/Contact/AddContact.vue";
import ContactProfile from "@/components/Home/Menu/Contact/ContactProfile.vue";
import {useContactStore} from "@/stores/contactStore.js";
import MessagesFeed from "@/components/Home/MessagesFeed.vue";
import ChatsFeed from "@/components/Home/ChatsFeed.vue";
import Report from "@/components/Home/Menu/Contact/Report.vue";

const uiStore = useUiStore();
const contactStore = useContactStore();

const openContacts = () => {
  uiStore.setContactOpen(true);
}

const toggleMenu = () => {
  uiStore.toggleMenu();
}
</script>
