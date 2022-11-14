import { createApp } from 'vue';
import SitePlayground from './views/SitePlayground.vue';
import App from './App.vue';
import { store, key } from './store';
import { setup } from '@/utils/bootstrap';

import '@/assets/css/tailwind.css';
import '@/assets/sass/fonts.scss';
import 'animate.css';

setup({
    onProduction: () => {
        createApp(App).use(store, key).mount('#app');
    },
    onDevelopment: () => {
        createApp(SitePlayground).use(store, key).mount('#app');
    },
});
