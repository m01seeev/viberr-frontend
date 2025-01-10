import {createRouter, createWebHistory} from 'vue-router';
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Messages from "@/views/Home.vue";

const routes = [
    {
        path: '/signin',
        name: 'signin',
        component: SignIn,
        meta: {requiresAuth: false}
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp,
        meta: {requiresAuth: false}
    },
    {
        path: '/home',
        name: "home",
        component: Messages,
        meta: {requiresAuth: true}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    if (to.meta.requiresAuth && !isAuthenticated) {
        alert('Сначала войдите в систему!');
        next('/signin');
    } else {
        next();
    }
});

export default router;