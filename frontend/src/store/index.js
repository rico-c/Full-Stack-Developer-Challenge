import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: null,
        usertype: null
    },
    mutations: {
        updateUser(state, { username, usertype }) {
            state.username = username;
            state.usertype = usertype;
        }
    }
});