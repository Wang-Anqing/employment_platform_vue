<template>
 <div class="company-login">
   <h1 class="company-login-title" style="left: 200px;top: 300px">Welcome !</h1>
   <h1 class="company-login-title" style="left: 200px;top: 370px">招聘信息管理系统</h1>
   <div class="company-login-cover">
    <h2 style="color: #fff;font-size: 30px;margin-top: 30px">账号登陆</h2>
     <el-input placeholder="请输入邮箱"
               v-model="company.email"
               style="width: 300px;background-color: transparent;margin-top: 50px">
       <i class="el-input__icon el-icon-message" slot="prefix"
          style="color: #fff;font-size: 20px;"></i>
     </el-input>
     <el-input placeholder="请输入密码"
               show-password
               v-model="company.password"
               style="width: 300px;background-color: transparent;margin-top: 50px">
       <i class="el-input__icon el-icon-lock" slot="prefix"
          style="color: #fff;font-size: 20px;"></i>
     </el-input>
     <a class="company-forget">忘记密码</a>
     <el-button type="primary" style="width: 300px" class="company-login-btn" @click="companyLogin">登 录</el-button>
     <el-button type="primary" style="width: 300px" class="company-register-btn" plain @click="companyRegister">注 册</el-button>
   </div>
 </div>
</template>

<script>
export default {
name: "CompanyLogin",
  data(){
  return {
    company:{}
  }
  },
  methods:{
    companyLogin(){
      console.log(this.company)
      if ((this.company.email === undefined || this.company.email ==='') || (this.company.password ===undefined || this.company.password ==='')){
        this.$message.error('邮箱和密码不能为空!!!')
      }else{
        this.$axios.post('/api/company/login',{
          email:this.company.email,
          password:this.company.password
        }).then(res => {
          console.log('company is :')
          console.log(res)
          this.$message({
            message: '登录成功',
            type: 'success'
          });
        }).catch(error => {
          this.$message.error('用户名或密码错误')
        })
      }
    },
    companyRegister(){

    }
  },
  created() {
    // console.log(sessionStorage.getItem('waq'))

  }
}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/company/login.css";
.company-login-cover >>>.el-input__inner {
  margin-left: 15px;
  border: 0;
  background-color: transparent;
  color: #fff;
  border-bottom: 2px solid #fff;
  border-radius: 0;
}
</style>
<style>
.el-input input::-webkit-input-placeholder {
  color:#fff;
  font-size: 18px;
}
</style>