<template>
  <div>
    <HeaderCase></HeaderCase>
    <PersonCase></PersonCase>
    <div class="w clearfix">
      <h1 style="width: 600px;
                 height: 42px;
                 margin: 20px auto;
                 cursor: pointer;"
          v-if="isTitleShow"
          @click="editTitle"
      >
      {{previewResume.title}}
      </h1>
      <!--      标题修改部分-->
      <div class="edit-title-box" v-if="!isTitleShow">
        <input type="text" onfocus="this.select()" v-model="previewResume.title" @keyup.enter="editTitle"></input>
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
<!--    简历主体-->
      <div class="resume">
<!--        简历头部基础信息-->
        <section class="resume-head clearfix" @click="$store.commit('editHeadShow')">
          <h3 v-if="previewResume.name ==''||previewResume.name === undefined">姓名</h3>
          <h3 v-if="previewResume.name !==undefined">{{previewResume.name}}</h3>
          <span v-if="previewResume.name ==''||previewResume.name === undefined" style="font-size: 14px;font-weight: 600">点击填写你的基本信息</span>
          <ul class="baseInfo">
            <li class="baseInfo-line">
              <span >{{previewResume.job}}</span>
              <span v-if="previewResume.job != undefined" class="span1">|</span>
              <span >{{previewResume.wage}}</span>
            </li>
            <li class="baseInfo-line">
              <span >{{previewResume.phone}}</span>
              <span v-if="previewResume.phone != undefined" class="span1">|</span>
              <span >{{previewResume.email}}</span>
            </li>
            <li class="baseInfo-line">
              <span >{{previewResume.birthday}}</span>
              <span v-if="previewResume.birthday != undefined" class="span1">|</span>
              <span >{{previewResume.sex}}</span>
              <span v-if="previewResume.sex != undefined" class="span1">|</span>
              <span >{{previewResume.politicalStatus}}</span>
              <span v-if="previewResume.politicalStatus != undefined" class="span1">|</span>
              <span >{{previewResume.nation}}</span>
              <span v-if="previewResume.nation != undefined" class="span1">|</span>
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
                 :src='previewResume.photo' class="avatar1">
            <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
          </el-upload>
        </section>
        <!--        教育经历部分-->
        <section class="resume-item clearfix" @click="$store.commit('editEduShow')">
          <h5 class="h5-tag">教育经历</h5>
          <h5 class="school" v-if="previewResume.school==undefined || previewResume.school==''">点击进行教育经历编辑</h5>
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
          <h5 class="school" v-if="previewResume.skill== ''||previewResume.skill ==undefined">点击进行专业技能编辑</h5>
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
          <h5 class="school" v-if="previewResume.program1Name == ''||previewResume.program1Name==undefined">点击进行项目经历编辑</h5>
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
          <h5 class="school" v-if="previewResume.schoolexp1Name==''||previewResume.schoolexp1Name==undefined">点击进行校内经历编辑</h5>
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
          <h5 class="school"  v-if="previewResume.others == ''||previewResume.others == undefined">点击进行其他的编辑</h5>
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
          <h5 class="school" v-if='previewResume.conclusion ==""||previewResume.conclusion == undefined'>点击进行个人总结编辑</h5>
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
          <a @click="addResume" :disabled="isSubmit">
            <i class="el-icon-check"></i>
          </a>
        </div>
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
import PercentPic from "@/components/PercentPic";
import PersonCase from "@/components/PersonBox";
import moment from "moment";
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
    EditResumeProgram,
    EditResumeSkill,
    EditResumeEdu,
    EditResumeHead,
    FooterCase,
    HeaderCase,
  },
  data() {
    return {
      //预览的简历
      previewResume:{},
      //最终提交的简历
      newResume:{},
      //简历标题是否显示
      isTitleShow:true,
      //简历中非空的字段数量（完成的百分比）
      number: 0,
      percent: 0,

      //markdown 预览模块配置
      markConfig: {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        boxShadow: false,
        previewBackground: "#ffffff",
      },
      //上传图片带的参数
      uploadData: {
        image: "",
        apiType: "bilibili",
        token: " bd72c92dc223c3d3128d674eb3f70625 ",
        folder: 891,
      },
      //添加项目经历按钮是否可点击
      isAddProgram: false,
      //添加校内经历按钮是否可点击
      isAddSchoolExp: false,
      //提交按钮是否可点击
      isSubmit:false,
    };
  },
  methods: {
    //title是否可编辑
    editTitle() {
      this.isTitleShow = !this.isTitleShow;
      sessionStorage.setItem(
          "previewResume",
          JSON.stringify(this.previewResume)
      );
    },
    //上传前获取到文件信息
    beforeUpload(file) {
      console.log("file is :");
      console.log(file);
      this.uploadData.image = file;
    },
    //上传成功后将图片拿下来，并且存入数据库
    handleAvatarSuccess(res, file) {
      console.log("res is :");
      console.log(res);
      this.previewResume.photo = res.data.url.distribute;
    },
    //增加项目经历
    addProgram() {
      this.$store.commit("editProgram1Show");
      this.isAddProgram = true;
    },
    //增加校内经历
    addSchoolExp() {
      this.$store.commit("editSchoolExp1Show");
      this.isAddSchoolExp = true;
    },
    // 提交新增的简历信息
    addResume(){
      let now = moment().toDate();
      now = moment(now).format("YYYY-MM-DD HH:mm:ss");
      this.previewResume.updateTime = now;
      console.log('提交的简历信息为：')
      console.log(this.previewResume)
      this.newResume = JSON.stringify(this.previewResume)
      console.log('当前的JSON为：')
      console.log(this.newResume)

      if (this.percent > 50){
        //向后端发送请求
        this.$axios.post("/api/resume/addResume",this.newResume,{
          headers: {
            "Content-Type": "application/json;charset=utf-8", //头部信息
          }
        }).then((res) => {
          console.log('新增简历完成');
          if (res.data) {
            this.$message({
              showClose: true,
              message: "新增简历完成！！！",
              type: "success",
            });
            this.isSubmit = true;
          }
          //新增简历后重新获取当前的建立列表
          this.$axios
              .post("/api/resume/getList", {
                jobseekerId: JSON.parse(this.$store.state.jobseeker).id,
              })
              .then((res) => {
                console.log(
                    "获取简历的id为：" + JSON.parse(this.$store.state.jobseeker).id
                );
                sessionStorage.setItem("resumeList", JSON.stringify(res.data));
                this.$store.state.resume = JSON.parse(
                    sessionStorage.getItem("resumeList")
                );
                console.log("resumeList is :");
                console.log(res.data);
              })
              .catch((err) => {
                console.log("进入了catch中！！！");
              });
        });
      }else {
        this.$message.error('简历完成度过低，请继续完成再提交！！！');
      }
    }
  },
  created(){
    this.$store.state.previewResume = {};
    this.previewResume = this.$store.state.previewResume;
    this.previewResume.title = '点击此处进行标题设置'
    this.previewResume.jobseekerId = JSON.parse(sessionStorage.getItem("jobseeker")).id
    // console.log('name is :'+this.previewResume.name)
  },

  watch: {
    //监听简历完成度
    "$store.state.previewResume": {
      handler() {
        for (let key in this.previewResume) {
          if (
              this.previewResume[key] != "" &&
              this.previewResume[key] != null &&
              this.previewResume[key] != undefined
          ) {
            this.number = this.number + 1;
          }
        }
        this.percent = (this.number * 100) / 35;
        console.log("percent is :");
        console.log(this.percent);
        //监听当前的preview Resume信息
        console.log('当前的preview Resume为：')
        console.log(this.previewResume)
        this.number = 0;
      },
      // 深度观察监听
      deep: true,
    },
  },
};
</script>

<style scoped>
@import "../css/common.css";
@import "../css/resumeDetail.css";
/deep/ .v-note-wrapper {
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
/deep/ .markdown-body ol {
  padding-left: 1em;
  margin: 0;
}
/deep/ .markdown-body p {
  margin: 0;
  padding: 0;
}
</style>