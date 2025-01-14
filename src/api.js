import axios from "axios";
import router from "./router.js";

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const status = error.response.status;
            const errorMessage = error.response.data?.error || 'Произошла ошибка';
            switch (status) {
                case 401:
                    if (errorMessage === "Неверный логин или пароль") {
                        console.log(errorMessage)
                    } else if (errorMessage === "Вы заблокированы") {
                        alert("Вы заблокированы!");
                        localStorage.removeItem('authToken');
                        router.push('/signin');
                    } else {
                        alert("Вы не авторизованы, пожалуйства, войдите!");
                        localStorage.removeItem('authToken');
                        router.push('/signin');
                    }
                    break;
                default:
                    alert(errorMessage);
            }
        } else {
            alert('Сетевая ошибка или сервер недоступен!');
        }
        return Promise.reject(error);
    }
);
export default api;