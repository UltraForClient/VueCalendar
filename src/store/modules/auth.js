import Vue from 'vue';

const state = {
    logged: false
};

const getters = {
    logged: state => {
        return state.logged
    }
};

const actions = {
    login({commit}, loginData) {
        Vue.http.post('login', loginData)
            .then(result => {
                localStorage.setItem('token', result.data.access_token);
                commit('LOGGED')
            });
    }
};

const mutations = {
    LOGGED(state) {
        state.logged = true
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};