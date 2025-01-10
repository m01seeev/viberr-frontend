import "/src/assets/styles/global.css"
import {createApp} from 'vue'
import App from './App.vue'
import router from './router.js'
import {createPinia} from "pinia";

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(createPinia());