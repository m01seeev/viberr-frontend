<template>
  <div class="back flex w-screen h-screen">
    <div class="left-part flex h-full w-1/6">
      <div class="flex items-center px-3 w-1/6 h-[8%]">
        <button class="group/additional h-1/3" @click="toggleMenu">
          <svg width="30" height="18" viewBox="0 0 45 37"
               class="group-hover/additional:fill-primary-hover fill-primary">
            <rect y="16.2639" width="45" height="4" rx="2"/>
            <rect width="45" height="4" rx="2"/>
            <rect y="32.5278" width="45" height="4" rx="2"/>
          </svg>
        </button>
      </div>
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
      <div class="back flex items-center px-3 w-full h-[8%]">
      </div>
    </div>
  </div>
  <Profile v-if="uiStore.profileOpen"></Profile>
  <Account v-if="uiStore.accountOpen"></Account>
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
import Account from "@/components/Home/Menu/Account.vue";
import {useUiStore} from "@/stores/uiStore.js";

const uiStore = useUiStore();
const toggleMenu = () => {
  uiStore.toggleMenu();
}
</script>
