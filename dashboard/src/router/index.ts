import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Home = () => import('../views/Home/PageHome.vue');
const Feedbacks = () => import('../views/Feedbacks/PageFeedbacks.vue');
const Credentials = () => import('../views/Credentials/PageCredentials.vue');

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/feedbacks',
        name: 'Feedbacks',
        component: Feedbacks,
        meta: {
            hasAuth: true,
        },
    },
    {
        path: '/Credentials',
        name: 'Credentials',
        component: Credentials,
        meta: {
            hasAuth: true,
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'Home' },
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
