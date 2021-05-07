<template>
    <div class="top">
<!--      未登录状态下的header-->
        <header class="header w clearfix">
            <router-link to="/" tag="a">
                <img class="logo" :src="logoSrc">
            </router-link>
            <ul class="nav">
                <li v-for="item in webPage" class="nav-item">
                    <router-link :to="item.route">
                        {{item.name}}
                    </router-link>
                </li>
            </ul>
            <div class="search">
                <el-input
                        placeholder="请输入关键词"
                        prefix-icon="el-icon-search"
                        v-model="searchWord"
                        clearable
                        @keyup.enter.native="searchEnter(searchWord)">
                </el-input>
            </div>
            <img :src="headSrc" class="head">
            <el-button type="primary" class="login" round @click="logIn" v-if="!this.$store.state.login_state">登录/注册</el-button>
          <div>
<!--        登录后替代部分-->
            <el-popover
                placement="bottom-start"
                width="300"
                trigger="hover"
                v-if="this.$store.state.login_state"
            >
              <ul class="personNav">
                <router-link tag="li" :to="item.route" v-for="item in headNavItem">
                  <i :class="item.icon" :style="item.color"></i>
                  <span>{{item.name}}</span>
                </router-link>
                <el-button type="danger" style="width: 270px;margin-top: 10px;" @click="logOut">退出登录</el-button>
              </ul>

              <router-link to="/person" slot="reference" class="username">{{username}}</router-link>
            </el-popover>
          </div>
        </header>
    </div>
</template>

<script>
    export default {
        name: "HeaderCase",
        data() {
            return {
                webPage: [{
                    name: '首页',
                    route: '/'
                }, {
                    name: '求职',
                    route: '/joblist'
                }, {
                    name: '笔试',
                    route: '/exam'
                }, {
                    name: '讨论区',
                    route: '/discuss'
                }, {
                    name: '排行榜',
                    route: '/ranklist'
                },
                ],
                headSrc: require('../imgs/head.png'),
                searchWord: '',
                logoSrc: require('../imgs/slogan.png'),
                username:'',
                headNavItem:[{
                  icon: 'el-icon-s-order',
                  name: '我的简历',
                  color:'color:#a9da70',
                  route: '/resume'
                },
                  {
                    icon:'el-icon-edit',
                    name:'刷题',
                    color:'color:#eeb53a',
                    route: ''
                  },
                  {
                    icon:'el-icon-chat-line-square',
                    name: '我的消息',
                    color:'color:#d08bea',
                    route: ''
                  }
                ]
            }
        },
        methods: {
            searchEnter(key) {
                alert('输入了' + key)
            },
            logIn() {
                this.$router.push('/login');
            },
          logOut(){
               sessionStorage.removeItem("login_state")
               sessionStorage.removeItem("jobseeker")
               // sessionStorage.setItem("login_state",false)
              this.$message.error('已退出登录！！！')
            this.$store.commit("logout")
              this.$router.push("/").catch(err => { console.log(err) })
              window.location.reload()
          }
        },
      created() {
          //根据登陆状态来显示头像以及用户组件
          if(this.$store.state.login_state){
            var headerSrc =  JSON.parse(this.$store.state.jobseeker).headerSrc
            var username = JSON.parse(this.$store.state.jobseeker).nickname
            // console.log("headerSrc is "+headerSrc)
            if (headerSrc != null && headerSrc!= ''){
              //设置用户头像
              this.headSrc = headerSrc
            }else{
              //用户默认头像
              this.headSrc= require('../imgs/head.png')
            }
            if (username != null && username!=""){
              //设置用户名
              this.username = username
            }
            //默认用户名
            else {
              this.username = '职青'+JSON.parse(this.$store.state.jobseeker).id+'号用户'
            }
          }else
            //未登录状态
            console.log("进入到了created中的else")
      },
      components: {}
    }


</script>
<style scoped>
@import "../css/common.css";
/*@import "../css/header.css";*/
.header {
  height: 60px;
  margin: 15px auto;
}

.logo {
  width: 180px;
  height: 60px;
  float: left;
  vertical-align: middle;
}

.nav {
  float: left;
  margin-left: 27px;
}

.nav-item {
  float: left;
  margin: 0 15px;

}

.nav-item a {
  display: block;
  height: 60px;
  line-height: 60px;
  font-size: 18px;
}

.nav-item a:hover {
  height: 60px;
  line-height: 60px;
  color: #00a4ff;
  border-bottom: 2px solid #00a4ff;
}

.search {
  display: inline-block;
  float: left;
  height: 60px;
  margin-left: 170px;
  line-height: 60px;
}

.login {
  float: right;
  margin: 10px;
}

.head {
  float: left;
  width: 40px;
  height: 40px;
  margin: 10px 40px;
  margin-right: 10px;
  line-height: 40px;
  vertical-align: middle;
}
.username {
  /*background-color: red;*/
  float: right;
  height: 60px;
  width: 110px;
  margin-right: 20px;
  line-height: 60px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.username:hover{
  color: #00a4ff;
}
.personNav {
  width: 270px;
  height: 130px;
  margin: 10px auto;
  /*background-color: red;*/
}
.personNav li {
  float: left;
  display: inline-block;
  width: 90px;
  height: 85px;
}
.personNav li:hover{
  background-color: #f3f4f5;
}
.personNav li i{
  font-style: normal;
  display: block;
  font-size: 40px;
  width: 50px;
  height: 50px;
  margin: 2px auto;
}
.personNav li span {
  display: block;
  width: 60px;
  margin: 2px auto;
}
</style>
