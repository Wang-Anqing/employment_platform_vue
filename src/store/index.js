import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login_state: false,
        jobseeker: ''
    },
    mutations: {
        login( state ){
            state.login_state = sessionStorage.getItem("login_state")
            state.jobseeker = sessionStorage.getItem("jobseeker")
            console.log(state.login_state)
            console.log("用户登陆成功")
        },
        logout(state) {
            state.login_state = false
            state.jobseeker = ''
            console.log("用户已注销")
        }
    },
    actions: {},
    modules: {}
})
