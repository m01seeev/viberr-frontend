<template>
  <div class="card flex flex-col items-center gap-1 border h-fit w-1/5 rounded-lg border-border bg-card shadow">
    <div class="card-body w-full flex flex-col items-start px-4 py-6 font-nunito text-l">
      <p class="text-darkPurple">Логин или почта</p>
      <input
          class="w-full bg-background rounded-md border border-border outline-none focus:border-primary px-2 text-xl py-0.5"
          type="text" placeholder="Введите логин или почту..."
          v-model="usernameOrEmail"/>
      <p class="text-red-500 text-sm" v-if="errors.usernameOrEmail">{{ errors.usernameOrEmail }}</p>
      <div class="flex justify-between w-full mt-5" v-if="!errors.usernameOrEmail">
        <p class="text-darkPurple">Пароль</p>
        <button class="text-darkPurple cursor-pointer hover:underline">Забыли пароль?</button>
      </div>
      <div class="flex justify-between w-full" v-if="errors.usernameOrEmail">
        <p class="text-darkPurple">Пароль</p>
        <button class="text-darkPurple cursor-pointer hover:underline">Забыли пароль?</button>
      </div>
      <input
          class="w-full bg-background rounded-md border border-border outline-none focus:border-primary px-2 text-xl py-0.5"
          type="password" placeholder="Введите пароль..."
          v-model="password"/>
      <p class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</p>
      <button v-if="!errors.password"
              class="w-full bg-primary text-xl text-primary-foreground rounded-md py-0.5 mt-8 font-exo hover:bg-primary-hover"
              @click="handleSignIn">
        Войти
      </button>
      <button v-if="errors.password"
              class="w-full bg-primary text-xl text-primary-foreground rounded-md py-0.5 mt-3 font-exo hover:bg-primary-hover"
              @click="handleSignIn">
        Войти
      </button>
    </div>
  </div>
  <div class="footer border border-border shadow w-1/5 h-fit mt-6 rounded-md bg-background">
    <div class="card-body w-full flex flex-col items-center justify-between px-4 py-2 font-nunito text-l">
      <p class="pt-1.5 text-darkPurple">Ещё не зарегистрированы?</p>
      <button class="py-1.5 px-4 hover:bg-lavender text-darkPurple rounded-md"
              @click="redirectToSignUp">Создать аккаунт
      </button>
    </div>
  </div>
  <div class="w-1/5 h-fit mt-4 border border-red-700 bg-red-300 flex items-center p-2 rounded-md justify-between"
       v-if="incorrectSignInData">
    <p class="font-exo text-[16px]">Неправильный логин или пароль</p>
    <button @click="closeAlert">❌</button>
  </div>
</template>

<style scoped>

</style>
<script setup>
import router from "@/router.js";
import {z} from "zod";
import {ref} from "vue";
import api from "@/api.js";

const usernameOrEmail = ref("");
const password = ref("");
const errors = ref({});
const incorrectSignInData = ref(false);

const signInSchema = z.object({
  usernameOrEmail: z.string().min(1, "Заполните это поле"),
  password: z.string().min(1, "Заполните это поле")
});

const validateForm = () => {
  try {
    errors.value = {};
    signInSchema.parse({
      usernameOrEmail: usernameOrEmail.value,
      password: password.value,
    });
    return true;
  } catch (validationError) {
    validationError.errors.forEach(err => {
      errors.value[err.path[0]] = err.message;
    });
    return false
  }
};

const handleSignIn = async () => {
  if (!validateForm()) {
    return
  }
  try {
    const response = await api.post('/auth/signin', {
      usernameOrEmail: usernameOrEmail.value,
      password: password.value,
    })
    const token = response.data.token;
    const userId = response.data.userId;
    const role = response.data.role;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId)
    localStorage.setItem('role', role)
    if (role === "USER") {
      await router.push('/home')
    } else {
      await router.push('/admin')
    }
  } catch (error) {
    console.log(error);
    incorrectSignInData.value = true;
    usernameOrEmail.value = "";
    password.value = "";
  }
};

const closeAlert = () => {
  incorrectSignInData.value = false;
}

const redirectToSignUp = () => {
  router.push('/signup')
};
</script>