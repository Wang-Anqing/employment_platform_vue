<template>
  <div>
    <HeaderCase></HeaderCase>
    <div class="w clearfix">
      <edit-resume-head @transferBaseInfo="getBaseInfo"></edit-resume-head>
      <!--    简历主体部分-->
      <div class="resume">
        <section class="resume-head clearfix">
          <h3 v-if="BaseInfo.name === ''">姓名</h3>
          <h3 >{{BaseInfo.name}}</h3>
          <span v-if="BaseInfo.name === ''">点击填写你的基本信息</span>
          <ul class="baseInfo">
            <li v-for="(item,index) in BaseInfo" v-if="index !== 'name'">
              {{item}}
              <span v-if="item != ''">|</span>
            </li>
          </ul>
          <img src="https://via.placeholder.com/80x96?text=add+photo" class="resume-photo">
        </section>
      </div>
    </div>
    <FooterCase></FooterCase>
  </div>
</template>

<script>
import HeaderCase from "@/components/Header";
import FooterCase from "@/components/Footerbox";
import EditResumeHead from "@/components/edit_resume/edit-resume-head";
export default {
  name: "Resume",
  components: {EditResumeHead, FooterCase, HeaderCase},
  data(){
    return {
      BaseInfo:{
        name:'',
        phone:'',
        email:'',
        location:'',
        nation:'',
        status:'',
        sex:'',
        birth:'',
        job:'',
        wage:''
      }
    }
  },
  methods:{
    getBaseInfo(msg){
      this.BaseInfo = msg
      console.log('父页面的简历信息为：')
      console.log(this.BaseInfo)
    },
    output(index) {
      console.log(index)
    }
  },
  computed:{
    // BaseInfoIsShow(){
    //   for (const key in this.BaseInfo) {
    //     if (this.BaseInfo.hasOwnProperty(key)) {
    //       if (this.BaseInfo[key] === 'name')
    //         continue
    //       else if (this.BaseInfo[key] === null || this.BaseInfo[key] === '') {
    //         console.log('为空')
    //       }else{
    //         console.log('不为空')
    //       }
    //     }
    //   }
    // }
  }
}
</script>

<style scoped>
@import "../css/common.css";
@import "../css/resume.css";
</style>