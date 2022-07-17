import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/tailwind.css'
import '@/assets/sass/fonts.scss'
import 'animate.css'
import { createApp } from 'vue'

createApp(App).use(store).use(router).mount('#app')
