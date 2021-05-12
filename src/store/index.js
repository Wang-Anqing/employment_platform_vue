import Vue from 'vue'
import Vuex from 'vuex'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // test:'aaa',
        //登陆状态
        login_state: sessionStorage.getItem("login_state"),
        //登录用户信息
        jobseeker: sessionStorage.getItem("jobseeker"),
        //初始化的简历信息
        resume: JSON.parse(sessionStorage.getItem('resumeList')),
        //编辑的简历
        // previewResume:JSON.parse(sessionStorage.getItem('previewResume')),
        previewResume:'',

        //投递的简历
        postResume:'',
        //简历编辑界面是否显示
        isShow:{
            editHead:false,
            editEdu:false,
            editSkill: false,
            editProgram:false,
            editProgram1:false,
            editSchoolExp:false,
            editSchoolExp1:false,
            editOther:false,
            editConclusion:false
        },

    },
    mutations: {
        //登录
        login( state ){
            state.login_state = sessionStorage.getItem("login_state")
            state.jobseeker = sessionStorage.getItem("jobseeker")
            console.log(state.login_state)
            console.log("用户登陆成功")
        },
        //注销
        logout(state) {
            state.login_state = false
            state.jobseeker = ''
            console.log("用户已注销")
        },
        //清空BaseInfo
        cleanBaseInfo(state){
            for (let key in state.BaseInfo) {
                console.log(key)
                state.BaseInfo[key] = ''
            }
        },
        //清空EduInfo
        cleanEduInfo(state){
            for (let key in state.EduInfo) {
                console.log(key)
                state.EduInfo[key] = ''
            }
        },
        //清空Skill
        cleanSkill(state){
            state.Skill = ''
        },
        //清空Program
        cleanProgram(state){
            for (let key in state.Program) {
                console.log(key)
                state.Program[key] = ''
            }
        },
        //清空Program1
        cleanProgram1(state){
            for (let key in state.Program1) {
                console.log(key)
                state.Program1[key] = ''
            }
        },
        //清空校内经历
        cleanSchoolExp(state){
            for (let key in state.SchoolExp) {
                console.log(key)
                state.SchoolExp[key] = ''
            }
        },
        //清空校内经历
        cleanSchoolExp1(state){
            for (let key in state.SchoolExp1) {
                console.log(key)
                state.SchoolExp1[key] = ''
            }
        },
        //其他
        cleanOther(state){
            state.Other = ''
        },
        //个人总结
        cleanConclusion(state){
            state.Conclusion = ''
        },
        //简历头部编辑界面是否显示
        editHeadShow(state) {
            state.isShow.editHead = !state.isShow.editHead
        },
        //简历教育经历界面死否显示
        editEduShow(state) {
            state.isShow.editEdu = !state.isShow.editEdu
        },
        //简历专业技能界面是否显示
        editSkillShow(state) {
            state.isShow.editSkill = !state.isShow.editSkill
        },
        //简历项目经历界面是否显示
        editProgramShow(state) {
            state.isShow.editProgram = !state.isShow.editProgram
        },
        //简历专业项目经历1界面是否显示
        editProgram1Show(state) {
            state.isShow.editProgram1 = !state.isShow.editProgram1
        },
        //校内经历界面是否显示
        editSchoolExpShow(state) {
            state.isShow.editSchoolExp = !state.isShow.editSchoolExp
        },
        editSchoolExp1Show(state) {
            state.isShow.editSchoolExp1 = !state.isShow.editSchoolExp1
        },
        editOtherShow(state) {
            state.isShow.editOther = !state.isShow.editOther
        },
        editConclusionShow(state) {
            state.isShow.editConclusion = !state.isShow.editConclusion
        }
    },
    actions: {},
    modules: {}
})
