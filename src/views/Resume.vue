<template>
  <div>
    <HeaderCase></HeaderCase>
    <div class="w clearfix">
<!--      简历编辑部分-->
      <edit-resume-head v-if="$store.state.isShow.editHead"></edit-resume-head>
      <edit-resume-edu v-if="$store.state.isShow.editEdu"></edit-resume-edu>
      <edit-resume-skill v-if="$store.state.isShow.editSkill"></edit-resume-skill>
      <edit-resume-program v-if="$store.state.isShow.editProgram"></edit-resume-program>
      <edit-resume-program1 v-if="$store.state.isShow.editProgram1"></edit-resume-program1>
      <edit-resume-school-exp v-if="$store.state.isShow.editSchoolExp"></edit-resume-school-exp>
      <edit-resume-school-exp1 v-if="$store.state.isShow.editSchoolExp1"></edit-resume-school-exp1>
      <edit-resume-other v-if="$store.state.isShow.editOther"></edit-resume-other>
      <edit-resume-conclusion v-if="$store.state.isShow.editConclusion"></edit-resume-conclusion>
      <!--    简历主体部分-->
      <div class="resume">
<!--        简历头部基础信息-->
        <section class="resume-head clearfix" @click="$store.commit('editHeadShow')">
          <h3 v-if="$store.state.BaseInfo.name === ''">姓名</h3>
          <h3 v-if="$store.state.BaseInfo.name !==''">{{$store.state.BaseInfo.name}}</h3>
          <span v-if="$store.state.BaseInfo.name === ''">点击填写你的基本信息</span>
          <ul class="baseInfo">
            <li class="baseInfo-line">
              <span >{{$store.state.BaseInfo.job}}</span>
              <span v-if="$store.state.BaseInfo.job != ''" class="span1">|</span>
              <span >{{$store.state.BaseInfo.wage}}</span>
            </li>
            <li class="baseInfo-line">
              <span >{{$store.state.BaseInfo.phone}}</span>
              <span v-if="$store.state.BaseInfo.phone != ''" class="span1">|</span>
              <span >{{$store.state.BaseInfo.email}}</span>
            </li>
            <li class="baseInfo-line">
              <span >{{$store.state.BaseInfo.birth}}</span>
              <span v-if="$store.state.BaseInfo.birth != ''" class="span1">|</span>
              <span >{{$store.state.BaseInfo.sex}}</span>
              <span v-if="$store.state.BaseInfo.sex != ''" class="span1">|</span>
              <span >{{$store.state.BaseInfo.status}}</span>
              <span v-if="$store.state.BaseInfo.status != ''" class="span1">|</span>
              <span >{{$store.state.BaseInfo.nation}}</span>
              <span v-if="$store.state.BaseInfo.nation != ''" class="span1">|</span>
              <span >{{$store.state.BaseInfo.location}}</span>
            </li>
          </ul>
          <el-upload
              class="avatar-uploader"
              :data="this.uploadData"
              action="https://www.hualigs.cn/api/upload"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <img v-if="photo" :src="photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </section>
<!--        教育经历部分-->
        <section class="resume-item clearfix" @click="$store.commit('editEduShow')">
          <h5 class="h5-tag">教育经历</h5>
          <h5 class="school" v-if="$store.state.EduInfo.school">{{$store.state.EduInfo.school}}</h5>
          <div class="school-info">
            <span v-if="$store.state.EduInfo.background">{{$store.state.EduInfo.background}}</span>
            <span v-if="$store.state.EduInfo.academy">{{$store.state.EduInfo.academy}}</span>
            <span v-if="$store.state.EduInfo.profession">{{$store.state.EduInfo.profession}}</span>
          </div>
          <br>
            <mavon-editor
                class="school-exp"
                v-if="$store.state.EduInfo.eduExp"
                :value="$store.state.EduInfo.eduExp"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
        </section>
<!--        专业技能部分-->
        <section class="resume-item clearfix" @click="$store.commit('editSkillShow')">
          <h5 class="h5-tag">专业技能</h5>
          <mavon-editor
              class="skill"
              v-if="$store.state.Skill"
              :value="$store.state.Skill"
              :subfield = "markConfig.subfield"
              :defaultOpen = "markConfig.defaultOpen"
              :toolbarsFlag = "markConfig.toolbarsFlag"
              :editable="markConfig.editable"
              :scrollStyle="markConfig.scrollStyle"
              :boxShadow="markConfig.boxShadow"
              :previewBackground="markConfig.previewBackground"
          ></mavon-editor>
        </section>
<!--        项目经历模块-->
        <section class="resume-item clearfix" @click="$store.commit('editProgramShow')">
          <h5 class="h5-tag">项目经历</h5>
          <el-link icon="el-icon-circle-plus" style="position:absolute;right: 5px;top:5px"
            @click="addProgram" :disabled="isAddProgram"
          >添加</el-link>
          <div class="program" v-if="$store.state.Program">
            <h5 style="text-align: left;margin-bottom: 5px;">{{$store.state.Program.name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{$store.state.Program.role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="$store.state.Program.express"
                :value="$store.state.Program.express"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
          <div class="program" v-if="$store.state.Program1">
            <h5 style="text-align: left;margin-bottom: 5px;">{{$store.state.Program1.name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{$store.state.Program1.role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="$store.state.Program1.express"
                :value="$store.state.Program1.express"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
        </section>
<!--        校内经历模块-->
        <section class="resume-item clearfix" @click="$store.commit('editSchoolExpShow')">
          <h5 class="h5-tag">校内经历</h5>
          <el-link icon="el-icon-circle-plus" style="position:absolute;right: 5px;top:5px"
            @click="addSchoolExp" :disabled="isAddSchoolExp"
          >添加</el-link>
          <div class="program" v-if="$store.state.SchoolExp">
            <h5 style="text-align: left;margin-bottom: 5px;">{{$store.state.SchoolExp.name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{$store.state.SchoolExp.role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="$store.state.SchoolExp.express"
                :value="$store.state.SchoolExp.express"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
          <div class="program" v-if="$store.state.SchoolExp1">
            <h5 style="text-align: left;margin-bottom: 5px;">{{$store.state.SchoolExp1.name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{$store.state.SchoolExp1.role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="$store.state.SchoolExp1.express"
                :value="$store.state.SchoolExp1.express"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
        </section>
<!--        其他模块-->
        <section class="resume-item clearfix" @click="$store.commit('editOtherShow')">
          <h5 class="h5-tag">其他</h5>
          <div class="program" v-if="$store.state.Other">
            <br>
            <mavon-editor
                class="skill"
                v-if="$store.state.Other"
                :value="$store.state.Other"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
        </section>
<!--        个人总结模块-->
        <section class="resume-item clearfix" @click="$store.commit('editConclusionShow')">
          <h5 class="h5-tag">个人总结</h5>
          <div class="program" v-if="$store.state.Conclusion">
            <br>
            <mavon-editor
                class="skill"
                v-if="$store.state.Conclusion"
                :value="$store.state.Conclusion"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
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
import EditResumeEdu from "@/components/edit_resume/edit-resume-edu";
import EditResumeSkill from "@/components/edit_resume/edit-resume-skill";
import EditResumeProgram from "@/components/edit_resume/edit-resume-program";
import EditResumeProgram1 from "@/components/edit_resume/edit-resume-program1";
import EditResumeSchoolExp from "@/components/edit_resume/edit-resume-schoolExp";
import EditResumeSchoolExp1 from "@/components/edit_resume/edit-resume-schoolExp1";
import EditResumeOther from "@/components/edit_resume/edit-resume-other";
import EditResumeConclusion from "@/components/edit_resume/edit-resume-conclusion";
export default {
  name: "Resume",
  components: {
    EditResumeConclusion,
    EditResumeOther,
    EditResumeSchoolExp1,
    EditResumeSchoolExp,
    EditResumeProgram1,
    EditResumeProgram, EditResumeSkill, EditResumeEdu, EditResumeHead, FooterCase, HeaderCase},
  data(){
    return {
      //markdown 预览模块配置
      markConfig:{
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow:false,
        previewBackground:'#ffffff'
      },
      // 基础简历信息
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
        wage:'',
      },
      //简历照片
      photo:'',
      //上传图片带的参数
      uploadData:{
        image: '',
        apiType:'ali',
        token:' bd72c92dc223c3d3128d674eb3f70625 ',
        folder:891
      },
      //添加项目经历按钮是否可点击
      isAddProgram:false,
      //添加校内经历按钮是否可点击
      isAddSchoolExp:false
    }
  },
  methods: {
    //上传前获取到文件信息
    beforeUpload(file) {
      console.log('file is :')
      console.log(file)
      this.uploadData.image = file
    },
    //上传成功后将图片拿下来，并且存入数据库
    handleAvatarSuccess(res, file) {
      console.log('res is :')
      console.log(res)
      this.photo = res.data.url.distribute
    },
    //增加项目经历
    addProgram(){
      this.$store.commit('editProgram1Show')
      this.isAddProgram = true
    },
    //增加校内经历
    addSchoolExp(){
      this.$store.commit('editSchoolExp1Show')
      this.isAddSchoolExp = true
    }
  },
  computed:{

  }
}
</script>

<style scoped>
@import "../css/common.css";
@import "../css/resume.css";
 /deep/ .v-note-wrapper{
   border: none;
  min-height: auto;
}
/deep/ .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  margin: 0;
  padding: 0;
}
/deep/.markdown-body ul {
  padding-left: 1em;
  margin: 0;
}
/deep/  .markdown-body ol{
  padding-left: 1em;
  margin: 0;
}
/deep/  .markdown-body p{
  margin: 0;
  padding: 0;
}
</style>