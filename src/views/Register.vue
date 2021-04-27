<template>
    <div>
        <Header></Header>
        <div class="wrapper">
            <div class="register_title">
                <router-link tag="a" to="/login" class="lg" id="lg">登录</router-link>
                <router-link tag="a" to="/register" class="rg" id="rg">注册</router-link>
            </div>
            <div class="register_content">
                <div class="form">
                      <div class="line_email line">
                        <el-input prefix-icon="el-icon-message" placeholder="请输入邮箱" v-model="email"
                                  id="email" @blur="checkEmail(email)"></el-input>
                        <el-tag type="danger" class="el-icon-warning" style="float:left;" v-if="tag1State">{{tag1}}</el-tag>
                      </div>
                      <div class="line_vcode line">
                        <el-input prefix-icon="el-icon-lock" placeholder="验证码" v-model="vcode"
                                  id="vcode" @blur="checkVcode(vcode)">
                          <template slot="append">
<!--                            <el-button type="primary" plain  @click="getVcode(email)">获取验证码</el-button>-->
                            <el-button type="primary" plain  @click="getVcode(email)" :disabled="disabled">
                              <span v-show="show">获取验证码</span>
                              <span v-show="!show" class="count">{{count}} s</span>
                            </el-button>
                          </template>
                        </el-input>
                        <el-tag type="danger" class="el-icon-warning" style="float:left;" v-if="tag2State">{{tag2}}</el-tag>
                      </div>
                        <div class="line_pass line">
                            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" show-password v-model="password"
                                      id="password" @blur="checkPassword(password)"></el-input>
                          <el-tag type="danger" class="el-icon-warning" style="float:left;" v-if="tag3State">{{tag3}}</el-tag>
                        </div>
                        <div class="line_repass line">
                            <el-input prefix-icon="el-icon-lock" placeholder="请再次确认密码" show-password
                                      v-model="repassword"
                                      id="repassword" @blur="checkRepassword(repassword)"></el-input>
                          <el-tag type="danger" class="el-icon-warning" style="float:left;" v-if="tag4State">{{tag4}}</el-tag>
                        </div>

<!--                        <input type="submit" id="submit" value="立即注册" @click="">-->
                        <button id="submit" @click="register">立即注册 </button>
                </div>
            </div>
        </div>
        <Footerbox></Footerbox>
    </div>
</template>

<script>
    import Footerbox from "@/components/Footerbox";

    export default {
        name: "Register",
        data() {
            return {
              disabled:false,
              show: true,
              count: "", // 初始化次数
              timer: null,
                email: '',
                vcode: '',//验证码
                password: '',
                repassword: '',
                tag1:'输入不能为空',
                tag2:'输入不能为空',
                tag3:'输入不能为空',
                tag4:'输入不能为空',
                //true 显示错误
                tag1State:true,
                tag2State:true,
                tag3State:true,
                tag4State:true
            }
        },
      methods:{
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
        //对输入的密码判空检测
        checkPassword(content){
          if (content===''||content===null){
            this.tag3State = true
            this.tag3 = '输入不能为空！'
          }else
            this.tag3State = false
        },
        //对输入的repassword判断
        checkRepassword(content){
          if (content===''||content===null){
            this.tag4State = true
            this.tag4 = '输入不能为空！'
          }else if(content !== this.password){
            this.tag4State = true
            this.tag4 = '两次密码输入不同，请检查后输入！'
          }else
            this.tag4State = false
        },
        //对输入的验证码判空处理
        checkVcode(content){
          if (content===''||content===null){
            this.tag2State = true
            this.tag2 = '输入不能为空！'
          }else
            this.tag2State = false
        },
      //  获取验证码
        getVcode(email){
          //60s内禁止重复获取验证码
          const TIME_COUNT = 60; //更改倒计时时间
          if (!this.timer) {
            this.disabled = true;
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.disabled = false;
                this.show = true;
                clearInterval(this.timer); // 清除定时器
                this.timer = null;
              }
            }, 1000);
          }

          let _this = this
          if (!this.tag1State){
            axios.get('/api/Vcode',{
              params: {
                receiver: email
              }
            }).then(res=>{
              // console.log('res is :')
              // console.log(res)
              this.$message({
                message: '验证码发送成功，请及时查看！',
                type: 'success'
              });
              sessionStorage.setItem('Vcode',res.data)
            }).catch(error => {
              this.$message.error('验证码发送失败！！！')
              console.log('验证码获取失败，在catch中，出错了')
            })
          }
        },
      //  用户注册
        register(){
          let _this = this
          if (this.tag1State||this.tag2State||this.tag3State||this.tag4State){
            console.log('未按要求填写！！！')
            this.$message.error('未按要求填写！！！')
          }else if (this.vcode !== sessionStorage.getItem('Vcode')){
            console.log('验证码错误！！！')
            this.$message.error('验证码错误！！！')
          }else{
            console.log('准备调用axios')
            this.$axios.post('/api/register/jobseeker',{
              email:this.email,
              password:this.password
            }).then(res =>{
              console.log('res is:')
              console.log(res)
              if (res.data){
                _this.$message({
                  message: '登录成功',
                  type: 'success'
                });
                _this.$router.push({path:'/login'})
                sessionStorage.removeItem('Vcode')
              }
            }).catch(error =>{
              console.log('error is :')
              console.log(error)
              _this.$message.error('该邮箱已注册！！！')
              sessionStorage.removeItem('Vcode')
            })
          }
        }
      },
        components: {Footerbox}
    }
</script>

<style src="../css/common.css"></style>
<style scoped>
    @import "../css/register.css";
</style>