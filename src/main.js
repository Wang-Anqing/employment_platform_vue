import Vue from 'vue'
import Vuex from "vuex";
import './plugins/axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import Header from "@/components/Header";
import VueSession from "vue-session/index.esm";
import VueCookies from "vue-cookies";
import Moment from 'moment';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error=> error)}

import htmlToPdf from '@/plugins/htmlToPdf'
Vue.use(htmlToPdf)

Vue.use(VueSession)
Vue.use(VueCookies)
Vue.use(Vuex)
Vue.use(Moment);
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.component('Header', Header)


axios.defaults.withCredentials=true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
