import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSocketIO from 'vue-socket.io'
import IndexPage from './pages/index.vue'

import 'bootstrap/scss/bootstrap.scss'

Vue.use(VueRouter)
Vue.use(VueSocketIO, '/')

var router = new VueRouter({
    routes: [
        { path: '/', component: IndexPage }
    ]
})

var app = new Vue({
    el: '#app',
    router: router
});
