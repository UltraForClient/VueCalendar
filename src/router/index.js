import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/Auth.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [

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
