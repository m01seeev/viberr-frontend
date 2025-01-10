<template>
  <div class="back h-screen w-screen flex flex-col items-center absolute z-10 top-0 left-0">
    <img src="/src/assets/images/logo.svg" alt="" class="pt-8">
    <h1 class="font-exo text-2xl my-6 text-foreground">Вход Vibe<span class="text-primary">RR</span></h1>
    <SignInCard></SignInCard>
  </div>
</template>

<style scoped>
.back {
  background: linear-gradient(110deg, hsl(var(--background)), var(--light-purple));
}
</style>

<script setup>
import SignInCard from "@/components/Auth/SignInCard.vue";
</script>