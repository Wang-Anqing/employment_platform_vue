<template>
  <div class="body-cover" :style="bodyCoverStyle">
    <!--      左侧导航栏-->
    <el-col :span="3">
      <el-menu
          :router="true"
          default-active="/company/resume"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-menu-item index="/company/index" style="margin-top: 200px">
          <i class="iconfont icon-qiye-copy-copy" style="margin-right: 5px"></i>
          <span slot="title">企业信息管理 </span>
        </el-menu-item>

        <el-menu-item index="/company/job">
          <i class="iconfont icon-GWES" style="margin-right: 5px"></i>
          <span slot="title">岗位信息管理</span>
        </el-menu-item>
        <el-menu-item index="/company/resume">
          <i class="iconfont icon-jianli" style="margin-right: 5px"></i>
          <span slot="title">简历接收与管理</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <!--      顶部标题-->
    <div class="company-title">
      <h1 style="color: #fff;float:left;margin-left: 20px;line-height: 60px">简历接收与管理</h1>
      <div style="color: #fff;float:right;width: 200px">
        <h3 style="height: 60px;line-height: 60px;margin-right: 15px;display: inline-block">{{company.number}}</h3>
        <a style="display:inline-block;height: 60px;width: 80px;cursor: pointer" @click="logout">
          <i class="iconfont icon-zhuxiao" style="width: 60px;height: 60px;font-size: 30px;color: #fff;line-height: 60px"></i>
        </a>
      </div>
    </div>
    <!--      main-->
    <div class="company-job-main">
      <el-table
          :data="receiveResumeList"
          style="width: 100%;height: 100%"
          max-height="660">
        <el-table-column
            prop="jobName"
            label="投递岗位"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="求职者名称"
            width="80">
        </el-table-column>
        <el-table-column
            prop="title"
            label="简历名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="job"
            label="求职意向"
            width="180">
        </el-table-column>
        <el-table-column
            prop="wage"
            label="期望薪资"
            width="80">
        </el-table-column>
        <el-table-column
            prop="school"
            label="毕业院校"
            width="130">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            width="200">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号码"
            width="120">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="50">
        </el-table-column>
        <el-table-column
            prop="location"
            label="居住地"
            width="120">
        </el-table-column>
        <el-table-column
            prop="nation"
            label="民族"
            width="80">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="生日"
            width="100">
        </el-table-column>
        <el-table-column
            prop="politicalStatus"
            label="政治状态"
            width="120">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope" class="btn">
            <div style="width: 100px">
              <el-button type="text" size="large" style="width: 100px">查看简历</el-button>
            </div>
            <div style="width: 100px  ">
              <el-button type="text" size="large" style="width: 100px">设置状态</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑岗位信息" :visible.sync="editShow">
        <el-form :model="editJob" label-width="80px">
          <el-form-item label="岗位名称" >
            <el-input v-model="editJob.name"  disabled style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="招聘人数" >
            <el-input v-model="editJob.account"  style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="岗位职责" >
            <el-input v-model="editJob.duty" type="textarea" :rows="4" style="width: 90%"></el-input>
          </el-form-item>
          <el-form-item label="岗位要求"  >
            <el-input v-model="editJob.request" type="textarea" :rows="5" style="width: 90%"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editShow = false">取 消</el-button>
          <el-button type="primary" @click="updateJob">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
import moment from "moment";

export default {
  name: "CompanyResume",
  data(){
    return {
      bodyWidth:'',
      bodyHeight:'',
      bodyCoverStyle:'',
      jobs:[],
      editJob:{},
      editShow:false,
      addShow:false,
      newJob:{},
      company:{},
      receiveResumeList:[]
    }
  },
  methods:{
    edit(row){
      console.log('the row is :')
      console.log(row)
      this.editJob = row
      this.editShow = true
    },
    updateJob(){
      this.$axios.post("/api/job/update",{
        id:this.editJob.id,
        account:this.editJob.account,
        duty:this.editJob.duty,
        request:this.editJob.request
      }).then(res => {
        this.editShow = false
        this.$message({
          message: '工作信息更新成功！！！',
          type: 'success'
        });
        this.$axios.get("/api/init/getJobList/"+JSON.parse(sessionStorage.getItem('company')).id).then(res1 => {
          // console.log('jobList is :')
          // console.log(res1.data)
          sessionStorage.setItem('jobList',JSON.stringify(res1.data))
          location.reload()
        })
      })
    },
    add(){
      this.addShow = true
    },
    addJob(){
      this.newJob.companyId = JSON.parse(sessionStorage.getItem('company')).id
      this.$axios.post("/api/job/add",{
        name:this.newJob.name,
        location:this.newJob.location,
        account:this.newJob.account,
        duty:this.newJob.duty,
        request:this.newJob.request,
        companyId:this.newJob.companyId
      }).then(res => {
        this.editShow = false
        this.$message({
          message: '工作岗位新增成功！！！',
          type: 'success'
        });
        this.$axios.get("/api/init/getJobList/"+JSON.parse(sessionStorage.getItem('company')).id).then(res1 => {
          // console.log('jobList is :')
          // console.log(res1.data)
          sessionStorage.setItem('jobList',JSON.stringify(res1.data))
          location.reload()
        })
      })
    },
    logout(){
      sessionStorage.clear()
      this.$message.error('已退出登录！！！')
      this.$store.commit("company_logout")
      this.$router.push("/company/login").catch(err => { console.log(err) })
      window.location.reload()
    }
  },
  created() {
    this.company = JSON.parse(sessionStorage.getItem('company'))
    this.bodyWidth = window.innerWidth
    this.bodyHeight = window.innerHeight-1
    this.bodyCoverStyle = 'width:'+this.bodyWidth+'px;height:'+this.bodyHeight+'px;background-color: rgba(255,254,253,.5)'
    this.$axios.post('/api/company/receiveResume',{
      companyId : this.company.id
    }).then(res =>{
      console.log('resumeList is')
      console.log(res.data)
      this.receiveResumeList = res.data
    })
  },

}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/company/job.css";
@import "../../icon-font/font_company_aside/iconfont.css";
@import "../../icon-font/font_logout/iconfont.css";
.company-index-main >>> label {
  color: #fff;
}
</style>