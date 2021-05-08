<template>
    <div>
      <HeaderCase></HeaderCase>
      <person-case></person-case>
      <img :src="contentImg">
      <footer-case></footer-case>
    </div>
</template>

<script>
    import HeaderCase from "@/components/Header";
    import FooterCase from "@/components/Footerbox";
    import PersonCase from "@/components/PersonBox";
    export default {
        name: "Persion",
      components: {PersonCase, FooterCase, HeaderCase},
      data(){
          return{
            contentImg:require('../imgs/person-tip.png'),
            title: '',
            name:'',
            personHeader:'',
            job:'',
            jobColor:'',
            school:'',
            schoolColor:'',
            isShowQua:true,
            qualification:'',
            qualificationColor:'',
            jobseeker:'',
            personNavItem:[{
              icon: 'el-icon-s-order',
              name: '我的简历',
              color:'color:#a9da70',
              route: ''
            },
              {
                icon:'el-icon-edit',
                name:'投递记录',
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
      methods:{
          goToEditPerson(){
            this.$router.push('/editPerson')
          },
      },
      created() {
          //将session中存储的信息转为json形式取出
          this.jobseeker = JSON.parse(sessionStorage.getItem('jobseeker'))
          //设置标题
          if (this.jobseeker.nickname === '' || this.jobseeker.nickname === null){
            this.name = '职青'+this.jobseeker.id+'号用户'
            this.title = '职青'+this.jobseeker.id+'号用户的个人中心'
          }else {
            this.title = this.jobseeker.nickname+'的个人中心'
            this.name = this.jobseeker.nickname
          }
          //设置头像
        if (this.jobseeker.headerSrc === '' || this.jobseeker.headerSrc === null){
          this.personHeader = require('../imgs/head.png')
        }else {
          this.personHeader = this.jobseeker.headerSrc
        }
        //设置公司名称
        if (this.jobseeker.position === null || this.jobseeker.position ==='' ){
          this.job = '未填写职业信息'
        }else {
          this.job = this.jobseeker.position
          this.jobColor = 'color:#00a4ff'
        }
        //设置学校信息
        if (this.jobseeker.school === '' || this.jobseeker.school === null) {
          this.school = '未填写学校信息'
        }else {
          this.school = this.jobseeker.school
          this.schoolColor = 'color:#00a4ff'
        }
        //设置资质认证
        if (this.jobseeker.qualification === '0'){
          this.qualification = '未通过资质认证'
        }else {
          this.qualification = '已通过资质认证'
          this.qualificationColor = 'color:#00a4ff'
          this.isShowQua = false
        }
      }
    }
</script>

<style scoped>
@import "../css/common.css";
@import "../css/person.css";
@import "../icon-font/font_person/iconfont.css";
</style>