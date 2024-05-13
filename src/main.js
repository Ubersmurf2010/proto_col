import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favourites from './pages/Favourites.vue'
import Counter from './components/Counter.vue'
import Login from './components/Login.vue'

const app = createApp(App)

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/favourites', name: 'Favourites', component: Favourites },
    { path: '/countdown', name: 'Countdown', component: Counter },
    { path: '/login', name: 'Login', component: Login }
]

const router = createRouter({
    history: createWebHistory(),
    routes

})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')


