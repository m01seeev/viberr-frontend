import {createRouter, createWebHistory} from 'vue-router';
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Messages from "@/views/Home.vue";
import Admin from "@/components/Admin.vue";

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
        meta: {requiresAuth: true, roles: ['USER']}
    },
    {
        path: '/admin',
        name: "admin",
        component: Admin,
        meta: {requiresAuth: true, roles: ['ADMIN']}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role')
    if (to.meta.requiresAuth && !isAuthenticated) {
        alert('Сначала войдите в систему!');
        next('/signin');
    }
    if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        alert('У вас нет доступа к этому разделу!');
        return next('/signin');
    }
    next()
});

export default router;