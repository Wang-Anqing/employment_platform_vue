<template>
  <div>
    <img src="" alt="">
    <HeaderCase></HeaderCase>
    <PersonCase></PersonCase>
    <div class="w clearfix">
<!--      简历标题-->
      <h1 style="width: 600px;
                 height: 42px;
                 margin: 20px auto;
                 cursor: pointer;"
          v-if="isTitleShow"
          @click="editTitle">
        {{previewResume.title}}
      </h1>
<!--      标题修改部分-->
      <div class="edit-title-box" v-if="!isTitleShow">
        <input type="text" v-model="$store.state.previewResume.title" @keyup.enter="editTitle"></input>
      </div>
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
          <h3 v-if="previewResume.name === ''">姓名</h3>
          <h3 v-if="previewResume.name !==''">{{previewResume.name}}</h3>
          <span v-if="previewResume.name === ''">点击填写你的基本信息</span>
          <ul class="baseInfo">
            <li class="baseInfo-line">
              <span >{{previewResume.job}}</span>
              <span v-if="previewResume.job != ''" class="span1">|</span>
              <span >{{previewResume.wage}}</span>
            </li>
            <li class="baseInfo-line">
              <span >{{previewResume.phone}}</span>
              <span v-if="previewResume.phone != ''" class="span1">|</span>
              <span >{{previewResume.email}}</span>
            </li>
            <li class="baseInfo-line">
              <span >{{previewResume.birthday}}</span>
              <span v-if="previewResume.birthday != ''" class="span1">|</span>
              <span >{{previewResume.sex}}</span>
              <span v-if="previewResume.sex != ''" class="span1">|</span>
              <span >{{previewResume.politicalStatus}}</span>
              <span v-if="previewResume.politicalStatus != ''" class="span1">|</span>
              <span >{{previewResume.nation}}</span>
              <span v-if="previewResume.nation != ''" class="span1">|</span>
              <span >{{previewResume.location}}</span>
            </li>
          </ul>
          <el-upload
              class="avatar-uploader1"
              :data="this.uploadData"
              action="https://www.hualigs.cn/api/upload"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <img v-if="previewResume.photo"
                 :src="previewResume.photo" class="avatar1">
            <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
          </el-upload>
        </section>
<!--        教育经历部分-->
        <section class="resume-item clearfix" @click="$store.commit('editEduShow')">
          <h5 class="h5-tag">教育经历</h5>
          <h5 class="school" v-if="previewResume.school">{{previewResume.school}}</h5>
          <div class="school-info">
            <span v-if="previewResume.background">{{previewResume.background}}</span>
            <span v-if="previewResume.academy">{{previewResume.academy}}</span>
            <span v-if="previewResume.profession">{{previewResume.profession}}</span>
          </div>
          <br>
            <mavon-editor
                class="school-exp"
                v-if="previewResume.eduExpress"
                :value="previewResume.eduExpress"
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
              v-if="previewResume.skill"
              :value="previewResume.skill"
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
<!--          项目经历1-->
          <div class="program" v-if="previewResume.program1Name">
            <h5 style="text-align: left;margin-bottom: 5px;">{{previewResume.program1Name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{previewResume.program1Role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="previewResume.program1Express"
                :value="previewResume.program1Express"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
<!--          项目经历2-->
          <div class="program" v-if="previewResume.program2Name" @click="$store.commit('editProgram1Show')">
            <h5 style="text-align: left;margin-bottom: 5px;">{{previewResume.program2Name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{previewResume.program2Role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="previewResume.program2Express"
                :value="previewResume.program2Express"
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
<!--          校内经历1-->
          <div class="program" v-if="previewResume.schoolexp1Name">
            <h5 style="text-align: left;margin-bottom: 5px;">{{previewResume.schoolexp1Name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{previewResume.schoolexp1Role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="previewResume.schoolexp1Express"
                :value="previewResume.schoolexp1Express"
                :subfield = "markConfig.subfield"
                :defaultOpen = "markConfig.defaultOpen"
                :toolbarsFlag = "markConfig.toolbarsFlag"
                :editable="markConfig.editable"
                :scrollStyle="markConfig.scrollStyle"
                :boxShadow="markConfig.boxShadow"
                :previewBackground="markConfig.previewBackground"
            ></mavon-editor>
          </div>
<!--          校内经历2-->
          <div class="program" v-if="previewResume.schoolexp2Name" @click="$store.commit('editSchoolExp1Show')">
            <h5 style="text-align: left;margin-bottom: 5px;">{{previewResume.schoolexp2Name}}</h5>
            <span style="float: left;font-size: 12px;margin-right: 5px;">{{previewResume.schoolexp2Role}}</span>
            <br>
            <mavon-editor
                class="skill"
                v-if="previewResume.schoolexp2Express"
                :value="previewResume.schoolexp2Express"
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
          <div class="program" v-if="previewResume.others">
            <br>
            <mavon-editor
                class="skill"
                v-if="previewResume.others"
                :value="previewResume.others"
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
          <div class="program" v-if="previewResume.conclusion">
            <br>
            <mavon-editor
                class="skill"
                v-if="previewResume.conclusion"
                :value="previewResume.conclusion"
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


        <!--        简历完成度-->
        <percent-pic
            style="position: absolute;right:-175px;bottom: 175px"
            :percentNum='parseInt(percent)'
            speed="3"
            size="155"
            content="简历完成度">
        </percent-pic>
        <!--      简历提交按钮-->
        <div class="submit-resume">
          <a @click="updateResume">
            <i class="el-icon-check"></i>
          </a>
        </div>
      </div>

    </div>
    <FooterCase></FooterCase>
  </div>
</template>

<script>
import moment from "moment"
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
import PercentPic from "@/components/PercentPic";
import PersonCase from "@/components/PersonBox";
export default {
  name: "Resume",
  components: {
    PersonCase,
    PercentPic,
    EditResumeConclusion,
    EditResumeOther,
    EditResumeSchoolExp1,
    EditResumeSchoolExp,
    EditResumeProgram1,
    EditResumeProgram, EditResumeSkill, EditResumeEdu, EditResumeHead, FooterCase, HeaderCase},
  data(){
    return {
      //最终提交的修改后的简历
      newResume:'',
      //简历中非空的字段数量（完成的百分比）
      number:0,
      percent:0,
      //传来的简历序号
      index:0,
      //title是否显示
      isTitleShow:true,
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
      //预览的简历信息
      previewResume:'',
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
    //title是否可编辑
    editTitle() {
      this.isTitleShow = ! this.isTitleShow
      sessionStorage.setItem('previewResume',JSON.stringify(this.$store.state.previewResume))
    },
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
      this.previewResume.photo = res.data.url.distribute
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
    },
    //提交更新的简历
    updateResume(){
      var reg = /[^\{}]*\{(.*)\}[^\}]*/;
      // var str = "1111{122}";
      // console.log(str.replace(reg,'$1'));
      //
      // str = "23{adf{223}}";
      // console.log('str is :'+str.replace(reg,'$1'));

      // var obj ={
      //   name:"123"
      // }

      this.newResume = JSON.parse(sessionStorage.getItem('previewResume'))
      // this.newResume = JSON.stringify(obj)
      let now = moment().toDate()
      now = moment(now).format('YYYY-MM-DD HH:mm:ss')
      console.log('now is :'+typeof (now))
      this.newResume.updateTime = now
      console.log('newResume is :')
      console.log( (this.newResume))
      this.newResume = JSON.stringify(this.newResume)
      this.newResume = this.newResume.replace(reg,'$1')

      this.$axios.post('/api/resume/updateResume',this.newResume,{
        headers: {
          "Content-Type": "application/json;charset=utf-8"  //头部信息
        }
          }).then(res =>{
        console.log('简历更新完成')
        //跟新完成后重新获取新的简历列表
        this.$axios.post('/api/resume/getList',{
          jobseekerId: JSON.parse(this.$store.state.jobseeker).id
        }).then( res => {
          console.log('获取简历的id为：'+JSON.parse(this.$store.state.jobseeker).id)
          sessionStorage.setItem('resumeList',JSON.stringify(res.data))
          this.$store.state.resume = JSON.parse(sessionStorage.getItem('resumeList'))
          console.log('resumeList is :')
          console.log(res.data)
        });
      })
    }
  },
  created() {
    //初始化要预览的简历信息
    this.index = Number(this.$route.query.index)
    sessionStorage.setItem('previewResume',JSON.stringify(this.$store.state.resume[this.index]))
    this.$store.state.previewResume = JSON.parse(sessionStorage.getItem('previewResume'))
    this.previewResume = this.$store.state.previewResume
    console.log('选中的简历为：')
    console.log(this.$store.state.resume[this.index])

    //是否可增加校园经历和项目经历
    if (this.$store.state.previewResume.program2Name !==''&& this.$store.state.previewResume.program2Name !== null){
      this.isAddProgram = true
    }
    if (this.$store.state.previewResume.schoolexp2Name !==''&& this.$store.state.previewResume.schoolexp2Name !== null){
      this.isAddSchoolExp = true
    }
  },
  watch:{
    //监听路由变化，发生改变则刷新页面
    $route:{
      handler(val,oldval){
        console.log('路由变化如下')
        console.log(val);//新路由信息
        console.log(oldval);//老路由信息
        location.reload()
      },
      // 深度观察监听
      deep: true
    },
    '$store.state.previewResume':{
      handler(){
        for (let key in this.$store.state.previewResume) {
          if (this.$store.state.previewResume[key] !== '' && this.$store.state.previewResume[key] !== null){
            this.number = this.number+1
          }
        }
        this.percent = (this.number*100 / 35)
        console.log('percent is :')
        console.log(this.percent)
        this.number = 0
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>

<style scoped>
@import "../css/common.css";
@import "../css/resumeDetail.css";
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