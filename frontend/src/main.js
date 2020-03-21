import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/element.scss'

import router from '@/router/index.js';
import store from '@/store/index';

import api from '@/apis/api';
import axiosInstance from '@/utils/axiosInstance';

Vue.config.productionTip = false

Vue.use(ElementUI);

// enabel global function
Vue.prototype.$axios = axiosInstance;
Vue.prototype.$api = api;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
