import Vue from 'vue';

const state = {
    tasks: [],
    task: {},
    refreshTask: 0,
};

const getters = {
    tasksGet: state => state.tasks.Get,
    tasksGive: state => state.tasks.Give,
    task: state => state.task,
    refreshTask: state => state.refreshTask,
};

const actions = {
    tasks({commit}, data) {
        Vue.http.get('tasks/my-tasks/' + data)
            .then(response => response.json())
            .then(result => {
                const give = [];
                Object.keys(result['Give']).map(key => {
                    give.push(result['Give'][key]);
                });

                const get = [];
                Object.keys(result['Get']).map(key => {
                    get.push(result['Get'][key]);
                });

                const newTask = {
                    'Give': give,
                    'Get': get
                };

                console.log(give);
                commit('TASKS', newTask);
            })
    },
    task({commit}, data) {

    },
    createTask({commit}, data) {
        Vue.http.post('tasks', data)
            .then(response => response.json())
            .then(result => {
                commit('REFRESHTASK');
            })
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
    REFRESHTASK(state) {
        state.refreshTask = ++state.refreshTask;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};