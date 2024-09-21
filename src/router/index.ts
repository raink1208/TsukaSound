import {createRouter, createWebHistory} from "vue-router";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: import("../views/TsukaSoundView.vue")
        },
        {
            path: '/quiz',
            component: import("../views/QuizView.vue")
        }
    ]
});