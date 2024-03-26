import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useProfileStore } from '@/stores/profile';

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'

//Boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
const profileStore = useProfileStore();

profileStore.fetchProfile().then(() => {
    app.mount('#app');
}).catch((error) => {
    console.error('Failed to fetch profile:', error);
});