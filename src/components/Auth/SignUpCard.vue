<template>
  <div class="flex flex-col items-start ml-[20%] text-darkPurple font-nunito text-[16px]">
    <h1 class="font-exo font-semibold text-[25px] mt-4">Регистрация VibeRR</h1>
    <p class="mt-3">Логин*</p>
    <input type="text" v-model="username" v-on:beforeinput="validateForm"
           class="w-4/5 bg-background rounded-md border border-border outline-none focus:border-primary p-2"
           placeholder="Введите логин..."/>
    <p class="text-red-500 text-sm" v-if="errors.username">{{ errors.username }}</p>
    <p class="mt-5" v-if="!errors.username">Почта*</p>
    <p v-if="errors.username">Почта*</p>
    <input type="text" v-model="email" v-on:beforeinput="validateForm"
           class="w-4/5 bg-background rounded-md border border-border outline-none focus:border-primary p-2"
           placeholder="Введите email..."/>
    <p class="text-red-500 text-sm" v-if="errors.email">{{ errors.email }}</p>
    <p class="mt-5" v-if="!errors.email">Имя*</p>
    <p v-if="errors.email">Имя*</p>
    <input type="text" v-model="firstName" v-on:beforeinput="validateForm"
           class="w-4/5 bg-background rounded-md border border-border outline-none focus:border-primary p-2"
           placeholder="Введите имя..."/>
    <p class="text-red-500 text-sm" v-if="errors.firstName">{{ errors.firstName }}</p>
    <p class="mt-5" v-if="!errors.firstName">Фамилия*</p>
    <p v-if="errors.firstName">Фамилия*</p>
    <input type="text" v-model="lastName" v-on:beforeinput="validateForm"
           class="w-4/5 bg-background rounded-md border border-border outline-none focus:border-primary p-2"
           placeholder="Введите фамилию..."/>
    <p class="text-red-500 text-sm" v-if="errors.lastName">{{ errors.lastName }}</p>
    <p class="mt-5" v-if="!errors.lastName">Пароль*</p>
    <p v-if="errors.lastName">Пароль*</p>
    <input type="password" v-model="password" v-on:beforeinput="validateForm"
           class="w-4/5 bg-background rounded-md border border-border outline-none focus:border-primary p-2"
           placeholder="Введите пароль..."/>
    <p class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</p>
    <p class="mt-5" v-if="!errors.password">Подтверждение пароля*</p>
    <p v-if="errors.password">Подтверждение пароля*</p>
    <input type="password" v-model="confirmPassword" v-on:beforeinput="validateForm"
           class="w-4/5 bg-background rounded-md border border-border outline-none focus:border-primary p-2"
           placeholder="Повторите пароль..."/>
    <p class="text-red-500 text-sm mb-10" v-if="!errors.confirmPassword"></p>
    <p class="text-red-500 text-sm mb-5" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
    <button @click="handleSignUp"
            class="w-4/5 font-exo bg-primary rounded-md text-primary-foreground py-2 hover:bg-primary-hover text-[20px]">
      Зарегистрироваться
    </button>
  </div>
</template>

<style scoped>

</style>

<script setup>
import {ref} from "vue";
import {z} from "zod";
import api from "@/api.js";
import router from "@/router.js";

const username = ref("");
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref({});

const signUpSchema = z.object({
  username: z.string().min(6, "Логин должен быть не менее 6 символов"),
  email: z.string().email("Некорректный формат email"),
  firstName: z.string().min(1, "Имя не может быть пустым"),
  lastName: z.string().min(1, "Фамилия не может быть пустой"),
  password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
  confirmPassword: z.string().min(6, "Подтверждение пароля обязательно"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

const validateForm = () => {
  try {
    errors.value = {};
    signUpSchema.parse({
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    return true;
  } catch (validationError) {
    validationError.errors.forEach(err => {
      errors.value[err.path[0]] = err.message;
    });

    return false;
  }
};

const handleSignUp = async () => {
  if (!validateForm()) {
    return;
  }
  try {
    const response = await api.post('/auth/signup', {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
    })
    alert("Вы успешно зарегистрировались!")
    await router.push('/signin')
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
</script>