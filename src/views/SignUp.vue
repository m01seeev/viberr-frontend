<template>
  <div class="back h-screen w-screen flex justify-start items-center absolute z-0 top-0 left-0">
    <div class="flex justify-center w-1/2">
      <h1 class="font-dancing text-[200px] text-darkPurple">Vibe<span class="RR text-accent">RR</span></h1>
    </div>
    <div class="z-20 flex flex-col w-1/2 h-full">
      <div class="flex justify-end pt-3 pr-12">
        <p class="font-exo text-darkPurple text-[16px]">Уже есть аккаунт?
          <span class="hover:underline cursor-pointer"
                @click="redirectToSignIn">Войти
          </span>
        </p>
      </div>
      <SignUpCard></SignUpCard>
    </div>
    <svg width="50%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none"
         class="trapezoid absolute top-0 left-1/2 z-10">
      <polygon points="15,0 100,0 100,100 0,100" fill="white"/>
    </svg>
  </div>
</template>

<style scoped>
.back {
  background: linear-gradient(
      35deg,
      var(--light-purple) 0%,
      hsl(var(--primary)) 50%,
      var(--light-purple) 100%
  );
}

.trapezoid {
  filter: drop-shadow(10px 10px 15px rgba(0, 0, 0, 1));
}

.RR {
  -webkit-text-stroke: 1px hsl(var(--accent));
  color: transparent;
}
</style>

<script setup>
import SignUpCard from "@/components/Auth/SignUpCard.vue";
import router from "@/router.js";

const redirectToSignIn = () => {
  router.push('/signin')
}
</script>