<template>
    <div>
        <Header></Header>
        <div class="wrapper">
            <div class="login_title">
                <router-link tag="a" to="/login" class="lg" id="lg">登录</router-link>
                <router-link tag="a" to="/register" class="rg" id="rg">注册</router-link>
            </div>
            <div class="login_content">
                <div class="form">
                        <div class="line_number">
                            <el-input prefix-icon="el-icon-message" placeholder="请输入邮箱" v-model="email"
                                      id="number" @focus="cleanPassword($event)" @blur="checkEmail(email)" select></el-input>
                          <el-tag type="danger" class="el-icon-warning" style="float:left;" v-if="tag1State">{{tag1}}</el-tag>
                        </div>
                        <div class="line_pass">
                            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" show-password v-model="password"
                                      id="password" @blur="checkPassword(password)"></el-input>
                          <el-tag type="danger" class="el-icon-warning" style="float:left;" v-if="tag2State">{{tag2}}</el-tag>
                        </div>
                        <div class="line_a"><a href="#">忘记密码？</a></div>
                        <button id="submit" @click="login">立即登录</button>
                    <button class="company" @click="toCompany">切换到企业版</button>
                </div>
            </div>
        </div>

        <Footerbox></Footerbox>
    </div>
</template>

<script>


    import Footerbox from "@/components/Footerbox";
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: '',
                tag1State: false,
                tag2State: false,
                tag1:'输入不能为空！',
                tag2:'输入不能为空！'
            }
        },
        methods: {
            toCompany() {
                this.$router.push('/company')
            },
            login(){
              this.$axios.defaults.withCredentials=true;
              this.$axios.post('/api/login/jobseeker',{
                email: this.email,
                password: this.password
              }).then(response => {
                sessionStorage.setItem("jobseeker",JSON.stringify(response.data))
                sessionStorage.setItem("login_state",true)
                this.$store.commit("login")
                this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                //登陆成功，跳回首页
                this.$router.push({path:"/"});
              }).catch(error => {
                // alert("在 catch 中")
                this.$message.error('用户名或密码错误')
              })
          },
          cleanPassword(event){
              event.currentTarget.select()
              this.password = ''
          },
          //对输入的邮箱进行正则判断
          checkEmail(content){
              var flag = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
            if (content===''||content===null){
              this.tag1State = true
              this.tag1 = '输入不能为空！'
            }else if(!flag.test(content)){
              this.tag1State = true
              this.tag1 = '输入不符合邮箱规范！'
            }else
              this.tag1State = false
          },
          //对输入的密码判空
          checkPassword(content){
            if (content===''||content===null){
              this.tag2State = true
              this.tag2 = '输入不能为空！'
            }else
              this.tag2State = false
          }
        },
        components: {Footerbox}
    }
</script>


<style src="../css/common.css"></style>
<style>
    @import "../css/login.css";
</style>