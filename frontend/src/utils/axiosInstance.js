/**
 * config axios request and response
 */

import axios from 'axios';

const instance = axios.create({});

// add response interceptors
instance.interceptors.response.use(res => {
    if (res.status === 200 && res.data) {
        if (res.data.code > 1) {
            instance.vm && instance.vm.$notify({
                title: 'Failed to get Data',
                message: res.data.msg,
                type: 'warning'
            });
        };
        return res.data;
    }
    else {
        instance.vm && instance.vm.$notify.error({
            title: 'error',
            message: 'Request failed'
        });
        return Promise.reject(new Error('Request failed'));
    }
}, error => {
    instance.vm && instance.vm.$notify.error({
        title: 'error',
        message: 'Request failed'
    });
    return Promise.reject(error);
});

export default instance;
