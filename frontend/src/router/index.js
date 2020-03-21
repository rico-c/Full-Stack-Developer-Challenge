/**
 * vue-router config
 */

import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/Home.vue';
import Admin from '@/pages/Admin.vue';
import Employee from '@/pages/Employee.vue';


Vue.use(Router);

// config web page route path
const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/employee',
            component: Employee
        },
    ]
});


export default router;
