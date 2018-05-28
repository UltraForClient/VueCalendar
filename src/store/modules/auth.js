import Vue from 'vue';
import jwt from 'jsonwebtoken'
import publicKey from '@/jwt/public'

const state = {
    logged: false
};

const getters = {
    logged: state => state.logged
};

const actions = {
    login({commit}, loginData) {
        Vue.http.post('login', loginData)
            .then(result => {
                jwt.verify(result.data.access_token, publicKey, error => {
                    if(!error) {
                        localStorage.setItem('token', result.data.access_token);
                        commit('LOGGED')
                    }
                })
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