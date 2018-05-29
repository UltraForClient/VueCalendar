import Vue from 'vue';

const state = {
    tasks: [],
    task: {},
    refreshTask: 0,
};

const getters = {
    tasks: state => state.tasks,
    task: state => state.task,
    refreshTask: state => state.refreshTask,
};

const actions = {
    tasks({commit}, data) {
        Vue.http.get('tasks/my-tasks/' + data)
            .then(response => response.json())
            .then(result => {
                commit('TASKS', result.Get)
            })
    },
    task({commit}, data) {

    },
    createTask({commit}, data) {

    },
    updateTask({commit}, data) {

    },
    deleteTask({commit}, data) {

    }
};

const mutations = {
    TASKS(state, tasks) {
        state.tasks = tasks;
    },
    TASK(state, task) {
        state.task = task;
    },
    REFRESHTASK(state, tasks) {
        state.tasks = tasks;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};