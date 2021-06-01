import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import('../views/Index.vue'),
        meta: {
            requireAuth: false//配置拦截

        }
    }, {
        path: '/discuss',
        name: 'Discuss',
        component: () => import('../views/Discuss.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    }, {
        path: '/exam',
        name: 'Exam',
        component: () => import('../views/Exam.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    }, {
        path: '/joblist',
        name: 'JobList',
        component: () => import('../views/JobList.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    }
    , {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
            requireAuth: false//配置拦截

        }

    }, {
        path: '/person',
        name: 'Person',
        component: () => import('../views/Person.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    }, {
        path: '/ranklist',
        name: 'RankList',
        component: () => import('../views/RankList.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    }, {
        path: '/register',
        name: 'Register',
        component: () => import('../views/Register.vue'),
        meta: {
            requireAuth: false//配置拦截

        }
    }, {
        path: '/jobdetail',
        name: 'JobDetail',
        component: () => import('../views/JobDetail.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    },  {
        path: '/company',
        name: 'CompanyIndex',
        component: () => import('../views/company/CompanyIndex'),
        meta: {
            requireAuth: true//配置拦截

        }
    },{
        path: '/resume',
        name: 'resume',
        component: ()=>import('../views/Resume'),
        meta: {
            requireAuth: true//配置拦截

        }
    },{
        path: '/resumeDetail',
        mame:'resumeDetail',
        component: () => import('../views/ResumeDetail'),
        meta: {
            requireAuth: true//配置拦截

        }
    },{
        path: '/newresume',
        mame:'newresume',
        component: () => import('../views/NewResume'),
        meta: {
            requireAuth: true//配置拦截

        }
    },{
        path: '/delivered',
        mame:'delivered',
        component: () => import('../views/Delivered'),
        meta: {
            requireAuth: true//配置拦截

        }
    },{
        path: '/test',
        name: 'Test',
        component: () => import('../views/Test.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    },
    {
        path: '/test1',
        name: 'Test1',
        component: () => import('../views/Test1.vue'),
        meta: {
            requireAuth: true//配置拦截

        }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta.requireAuth){
        if(sessionStorage.getItem("jobseeker")){
            next();
        }else{
            next({
                path:'/login'
            })
        }
    }else{
        next();
    }
})

export default router
