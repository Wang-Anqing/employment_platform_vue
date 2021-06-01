<template>
  <div>
    <div class="person w clearfix" style="background-color:#fff;">
      <div class="person-top">
        <h2 class="person-title">{{title}}</h2>
        <div class="person-header">
          <img :src="personHeader">
        </div>
        <el-button type="primary" round class="person-edit"
                   @click="editDialogVisible = true">编辑资料</el-button>
        <el-button type="primary" round class="person-qualify" v-if="isShowQua">资质认证</el-button>
      </div>
      <h2 class="person-name">{{name}}</h2>
<!--      认证信息展示-->
      <ul class="info-tag clearfix">
        <li class="job-tag">
          <span class="iconfont icon-gongsi" :style="jobColor"></span>
          <span class="gongsi">{{job}}</span>
        </li>
        <li class="school-tag">
          <span class="iconfont icon-xuexiao" :style="schoolColor"></span>
          <span class="xuexiao">{{school}}</span>
        </li>
        <li class="qualification-tag">
          <span class="iconfont icon-renzheng" :style="qualificationColor"></span>
          <span class="renzheng">{{qualification}}</span>
        </li>
      </ul>
<!--      个人中心导航-->
      <div style="width: 1200px;height: 130px;border-bottom: 1px solid #a3a3a3">
        <ul class="person-nav">

          <el-popover
              placement="left-start"
              width="300"
              trigger="hover">
            <router-link tag="li" :to="resumeNav.route" slot="reference">
              <i :class="resumeNav.icon" :style="resumeNav.color"></i>
              <span>{{resumeNav.name}}</span>
            </router-link>
            <ul class="resume-popover">
<!--              已创建的简历列表-->
              <li class="resume-popover-item" v-for="(item,index) in resumeList">
                <!--                简历标题-->
                <h4>{{ item.title }}</h4>
                <!--                可选项-->
                <ul class="clearfix">
                  <li class="resume-option">
                    <a class="el-icon-view " @click="previewResume(index)">预览</a>
                  </li >
                  <li class="resume-option">
                    <a class="el-icon-download " @click="download(index)">下载</a>
                  </li>
                  <li class="resume-option">
                    <a class="el-icon-delete ">删除</a>
                  </li>
                </ul>
                <!--                最近修改时间-->
                <div>最近修改于：{{item.updateTime}}</div>
              </li>
<!--              新增简历按钮-->
              <li class="resume-popover-item">
                <a class="add-resume" @click="newResume">
                  <span class="el-icon-plus"></span>
                </a>
              </li>

            </ul>
          </el-popover>
          <router-link tag="li" :to="item.route" v-for="item in personNavItem">
            <i :class="item.icon" :style="item.color"></i>
            <span>{{item.name}}</span>
          </router-link>
        </ul>
      </div>
<!--      编辑个人信息的dialog-->
      <el-dialog title="编辑个人信息" :visible.sync="editDialogVisible">
        <div class="editInfo">
          <ul>
            <li>
              <span>用户昵称</span>
              <div style="width: 300px;display: inline-block">
                <el-input size="small" placeholder="请输入新昵称" v-model="newJobseeker.nickname"></el-input>
              </div>
            </li>
            <li>
              <span>工作单位</span>
              <div style="width: 300px;display: inline-block">
                <el-input size="small" placeholder="请输入工作单位" v-model="newJobseeker.position"></el-input>
              </div>
            </li>
            <li>
              <span>学校名称</span>
              <div style="width: 300px;display: inline-block">
                <el-input size="small" placeholder="请输入学校名称" v-model="newJobseeker.school"></el-input>
              </div>
            </li>
            <li style="border: none;position: relative">
              <div class="header-tag">选择头像</div>
              <el-upload
                  class="avatar-uploader"
                  :data="this.uploadData"
                  action="https://www.hualigs.cn/api/upload"
                  :before-upload="beforeUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess">
                <img v-if="newJobseeker.headerSrc" :src="newJobseeker.headerSrc" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateJobseeker">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  name: "PersonCase",
  data(){
    return{
      //简历信息列表
      resumeList:'',
      //上传图片带的参数
      uploadData:{
        image: '',
        apiType:'ali',
        token:' bd72c92dc223c3d3128d674eb3f70625 ',
        folder:793
      },
      //编辑表单的显示
      editDialogVisible:false,
      //修改后的个人信息
      newJobseeker:'',
      //页面元素
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
      resumeNav:{
        icon: 'el-icon-s-order',
        name: '我的简历',
        color:'color:#a9da70',
        route: '/resume'
      },
      personNavItem:[
        {
          icon:'el-icon-edit',
          name:'投递记录',
          color:'color:#eeb53a',
          route: '/delivered'
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
    //创建新简历
    newResume(){
      this.$router.push('/newresume')
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
      this.newJobseeker.headerSrc = res.data.url.distribute
    },
    //更新用户信息
    updateJobseeker(){
      console.log('newJobseeker is :')
      console.log(this.newJobseeker)
      sessionStorage.setItem('jobseeker',JSON.stringify(this.newJobseeker))
      this.$axios.post('/api/jobseeker/update',{
        id: this.newJobseeker.id,
        password: this.newJobseeker.password,
        email: this.newJobseeker.email,
        nickname: this.newJobseeker.nickname,
        headerSrc: this.newJobseeker.headerSrc,
        school: this.newJobseeker.school,
        position: this.newJobseeker.position,
        qualification: this.newJobseeker.qualification,
        docSrc: this.newJobseeker.docSrc,
        status: this.newJobseeker.status
      }).then (res => {
        console.log('用户信息更新完成')
        this.$message({
          message: '信息修改成功！！！',
          type: 'success'
        });
      })
      this.editDialogVisible = false
      location.reload()
    },
    //设置要预览的简历
    previewResume (index){
      this.$router.push({path:'/resumeDetail', query: {index:index}})
    },
    //点击下载简历
    download(index) {
      this.$router.push({path:'/resumeDetail', query: {index:index,operation:'download'}})
    },
  },
  created() {
    //将session中存储的信息转为json形式取出
    this.jobseeker = JSON.parse(sessionStorage.getItem('jobseeker'))
    //将原本session中的jobseeker值付给newJobseeker
    this.newJobseeker = this.jobseeker
    //初始化简历
    this.resumeList = this.$store.state.resume
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
      this.newJobseeker.headSrc = this.jobseeker.headerSrc
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
@import "../css/personBox.css";
@import "../icon-font/font_person/iconfont.css";
</style>