import Vue from 'vue';

const state = {
    logged: false,
    userList: []
};

const getters = {
    logged: state => state.logged,
    userList: state => state.userList
};

const actions = {
    login({commit}, loginData) {
        Vue.http.post('login', loginData)
            .then(result => {
                localStorage.setItem('token', result.data.access_token);

                let jwtData = result.data.access_token.split('.')[1];
                let decodedJwtJsonData = window.atob(jwtData);
                localStorage.setItem('userId', JSON.parse(decodedJwtJsonData).sub);
                commit('LOGGED')
            });
    },
    userList({commit}) {
        Vue.http.get('user-list')
            .then(response => response.json())
            .then(result => {
                commit('USERLIST', result)
            })
    }
};

const mutations = {
    LOGGED(state) {
        state.logged = true
    },
    USERLIST(state, userList) {
        state.userList = userList
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};