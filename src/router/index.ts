import {createRouter, createWebHistory} from "vue-router";
import TsukaSoundView from "../views/TsukaSoundView.vue";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: TsukaSoundView
        },
        {
            path: '/quiz',
            component: import("../views/QuizView.vue")
        }
    ]
});