import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Home from '@/views/Home.vue';
import About from '@/views/Auth.vue';

import Calendar from '@/components/calendar/Calendar.vue'
import List from '@/components/calendar/List.vue'

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/calendar/give-task',
                    name: 'calendar-give-task',
                    component: Calendar
                },
                {
                    path: '/list/give-task',
                    name: 'list-give-task',
                    component: List
                }
            ]
        },
        {
            path: '/auth',
            name: 'auth',
            component: About,
            children: [
                {
                    name: 'login',
                    path: '/auth/login'
                },
                {
                    name: 'register',
                    path: '/auth/register'
                }
            ]
        }
    ]
});
