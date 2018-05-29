import Vue from 'vue';
import App from './App.vue';
import Resource from 'vue-resource';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import router from './router';
import store from './store';

import env from './env';

Vue.use(Resource);
Vue.use(Vuetify, { theme: {
        primary: '#0082af',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    }
});

Vue.http.options.root = env.API_URL;
Vue.http.interceptors.push((request, next) => {
    if(localStorage.getItem('token'))
        request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    next(response => {
        if(response.status === 400 || response.status === 401 || response.status === 403)
            router.push({path: 'auth/login'});
    });
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
