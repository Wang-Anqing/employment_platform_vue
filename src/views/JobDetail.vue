<template>
    <div class="">
      <Header></Header>
      <div class="clearfix w">
<!--         左侧公司信息-->
        <div class="main" style="float:left;">
          <div class="companyInfo">
            <h2>公司介绍</h2>
            <p>{{company.introduce}}</p>
          </div>
          <div class="companyInfo">
            <h2>福利待遇</h2>
            <p>{{company.benefit}}</p>
          </div>
          <div class="companyInfo">
            <h2>基本要求</h2>
            <p>{{company.request}}</p>
          </div>
<!--          工作信息-->
          <div class="jobInfo">
            <el-collapse  accordion>
              <el-collapse-item  v-for="(item,index0) in job" :name=item.id style="width: 700px">
                <template slot="title">
                  <h2>{{item.name}}</h2>
                  <div>
                    <span style="margin-left: 30px;"><i class="el-icon-user-solid"></i>{{item.account}}</span>
                    <span style="margin-left: 10px;"><i class="el-icon-location"></i>{{item.location}}</span>
                  </div>
                </template>
                <div class="jobDuty">
                  <h3><i class="el-icon-s-opportunity"></i>岗位职责</h3>
                  <p>{{item.duty}}</p>
                </div>
                <hr>
                <div class="jobRequest">
                  <h3><i class="el-icon-s-cooperation"></i>岗位要求</h3>
                  <p>{{item.request}}</p>
                </div>
                <el-popover
                  placement="left"
                  width="300"
                  trigger="click">
                  <a class="sendResum" slot="reference">立即投递</a>
                  <ul>
                    <li class="resumebox-popover-item" v-for="(resume,index) in resumeList"
                        @click="selectResume(index,index0)"
                    >
                      <a>{{resume.title}}</a>
                      <div>最近修改于：{{resume.updateTime}}</div>
                    </li>
                  </ul>
                </el-popover>
                <el-dialog  :visible.sync="dialogShow" append-to-body width="500px" :before-close="handleClose">
                  <div class="dialog-body">
                    <h2 style="display: inline-block;">人岗匹配度（百分制）:</h2>
                    <h2 style="color: #00a4ff;display: inline-block;margin-left: 20px">{{score}}分</h2>
                    <h3 style="margin-top: 20px">{{suggestion}}</h3>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogShow = false">再看看</el-button>
                    <el-button type="primary" @click="sendResume">继续投递简历</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
<!--        右侧-->
        <div class="right">
          <div class="companyLogo" style="margin:0 auto">
            <img style="width: 150px;height: 150px" :src="company.logoSrc">
            <h3>{{company.name}}</h3>
          </div>
<!--          时间线-->
          <div class="timeLine">
            <el-timeline >
              <el-timeline-item
                  v-for="(item,index) in date"
                  :timestamp="item.timestamp"
                  color='#00a4ff'>
                {{item.content}}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
<!--        相关讨论帖子-->
      </div>
      <Footerbox></Footerbox>
    </div>
</template>

<script>
    import moment from "moment"
    import Footerbox from "@/components/Footerbox";

    export default {
        name: "JobDetails",
      components: {Footerbox},
      data() {
            return {
              //简历投递记录
              resumeBox: {
                //求职者id
                jobseekerId:0,
                //选择投递的工作id
                jobId:0,
                //投递公司的id
                companyId:0,
                //选择投递的简历id
                resumeId:0,
              },
              //是否显示Dialog
              dialogShow: false,
              //匹配度
              score:0,
              //岗位建议
              suggestion:'',
              //简历列表
              resumeList:'',
              //  公司信息
                  company: {
                    id: 0,
                    name: '',
                    des: '',
                    logoSrc:'',
                  },
              //  企业招聘时间线
                  date:[
                      {
                    content:'内推开始时间',
                    timestamp: '',
                  },{
                    content:'内推截至时间',
                    timestamp:  '',
                  },{
                    content: '网申开始时间',
                    timestamp: '',
                  },{
                    content: '网申截至时间',
                    timestamp: '',
                  },{
                    content: '笔试开始事件',
                    timestamp:'',
                  },{
                    content: '笔试截至时间',
                    timestamp: '',
                  },{
                    content: '面试开始时间',
                    timestamp: '',
                  },{
                    content: '面试截至时间',
                    timestamp: '',
                  },{
                    content: 'offer发放时间',
                    timestamp: '',
                  },{
                    content: 'offer截至时间',
                    timestamp: '',
                  }
              ],
              //  工作信息
                  job: [],

            }
        },
      methods: {
          //关闭dialog
        handleClose(done) {
          this.$confirm('是否放弃投递呢？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
        },
          dateFormat(date){
            if (date === null)
              return null;
            else{
              let date1 = moment(date).format('YYYY-MM-DD')
              return date1
            }
          },
        //获取点击投递的简历信息以及投递的JD信息，并接受返回的关键词
        selectResume(index,index0) {
          let reg =  /\s*/g
          let jdStr = '';
          let resumeStr= '';
          let cv = this.resumeList[index];
          let jb = this.job[index0];

          //生成投递记录
          this.resumeBox.resumeId = cv.id;
          this.resumeBox.jobseekerId = JSON.parse(this.$store.state.jobseeker).id;
          this.resumeBox.companyId = this.company.id;
          this.resumeBox.jobId = jb.id;
          console.log("当前的resumeBox为：")
          console.log(this.resumeBox)

          //创建生成关键词的的text
          resumeStr = cv.academy+cv.background+cv.eduExpress+cv.job+cv.others+
              cv.politicalStatus+cv.profession+cv.program1Express+cv.program1Name+
              cv.program1Role+cv.program2Express+cv.program2Name+cv.program2Role+
              cv.skill+cv.wage+cv.schoolexp1Express+cv.schoolexp1Name+cv.schoolexp1Role+
              cv.schoolexp2Express+cv.schoolexp2Name+cv.schoolexp2Role
          resumeStr = resumeStr.replaceAll(reg,'')
          console.log('当前的简历str为')
          console.log(resumeStr)
          jdStr = jb.duty + jb.location + jb.name + jb.request + jb.tag
          jdStr = jdStr.replaceAll(reg,'')
          console.log('当前的JDStr为')
          console.log(jdStr)
          let obj = {
            resume: resumeStr,
            jd: jdStr
          }
          console.log(JSON.stringify(obj))
          this.$axios.post("/api/match",JSON.stringify(obj),{
            headers: {
              "Content-Type": "application/json;charset=utf-8", //头部信息
            },
          }).then((res) =>{
            console.log('人岗匹配度为：')
            console.log(res.data)
            if (res.data > 0 && res.data < 10 )
              this.score = Math.round(res.data * 5)
            else  if (res.data < 13)
              this.score = Math.round(res.data * 4.6)
            else if (res.data < 19 )
              this.score = Math.round(res.data * 4.3)
            else
              this.score = Math.round(Math.random()*10+81)
            console.log("this.score is :"+ this.score)
            //根据分数段设置就职建议
            if (this.score>0 && this.score<60)
              this.suggestion = '您可能不太适合这份工作，建议您换份工作试试-_-!!'
            else if (this.score > 60 && this.score <80 )
              this.suggestion = '这份工作与您较为匹配，可以试试哦－O－'
            else
              this.suggestion = '您比较适合这份工作，把握较大哦^_^'
            this.dialogShow = true
          })
        },
        //将简历投递给招聘单位
        sendResume(){
          this.$axios.post("/api/sendResume",JSON.stringify(this.resumeBox),{
            headers:{
              "Content-Type": "application/json;charset=utf-8", //头部信息
            }
          }).then((res) => {
            this.dialogShow = false
            this.$message({
              showClose: true,
              message: '简历投递完成，可在个人中心查看详情',
              type: 'success'
            });
          })
        }
      },
      created() {
          //初始化简历列表
        this.resumeList = this.$store.state.resume

            let _this = this;
            this.company.id = this.$route.query.id;
            console.log('当前页面为' + this.company.id)

          //获取企业信息
         this.$axios.post('/api/init/jobDetails',{
              id: this.company.id
            }).then(res => {
              console.log('企业信息获取成功')
              console.log(res)
              _this.company = res.data
              _this.company.id = res.data.id
           _this.date[0].timestamp = _this.dateFormat(res.data.recomStartDate)
           _this.date[1].timestamp = _this.dateFormat(res.data.recomEndDate)
           _this.date[2].timestamp = _this.dateFormat(res.data.applyStartDate)
           _this.date[3].timestamp = _this.dateFormat(res.data.applyEndDate)
           _this.date[4].timestamp = _this.dateFormat(res.data.writtenStartDate)
           _this.date[5].timestamp = _this.dateFormat(res.data.writtenEndDate)
           _this.date[6].timestamp = _this.dateFormat(res.data.interviewStartDate)
           _this.date[7].timestamp = _this.dateFormat(res.data.interviewEndDate)
           _this.date[8].timestamp = _this.dateFormat(res.data.offerStartDate)
           _this.date[9].timestamp = _this.dateFormat(res.data.offerEndDate)
           console.log('date is :')
           console.log(_this.date)
          console.log('_this.company.id is')
          console.log(_this.company.id)
            }).catch(error => {
              console.log('企业信息获取失败')
            })

         //获取企业的在招职位信息
          this.$axios.get('/api/init/getJobList/'+_this.company.id).then(res => {
            console.log('工作列表获取成功 ')
            console.log(res)
            _this.job = res.data
          }).catch(error => {
            console.log('工作列表获取失败')
          })

        //更新企业的浏览人数
        this.$axios.get('/api/update/viewer/'+_this.company.id).then(res =>{
          console.log('浏览人数更新成功')
          console.log(res)
        }).catch(error =>{
          console.log('浏览人数更新失败')
        })
        }
    }
</script>

<style scoped>
@import "../css/common.css";
@import "../css/jobDetail.css";
.timeLine >>> .el-timeline-item__wrapper {
  position: relative;
  padding-left: 28px;
  height: 15px;
  top: -3px;
}
.timeLine >>> .el-timeline-item__content{
  position: absolute;
  left: 20px;
  top: 0;
  color: #303133;
}
.timeLine >>> .el-timeline-item__content{
  position: absolute;
  left: 20px;
  top: 0;
  color: #303133;
}
.timeLine >>> .el-timeline-item__timestamp{
  position: absolute;
  left: 20px;
  top: 13px;
  color: #909399;
  line-height: 1;
  font-size: 13px;
}
.el-timeline-item:nth-child(odd) >>> .el-timeline-item__content{
  position: absolute;
  left: -100px;
  top: 0;
  color: #303133;
}
.el-timeline-item:nth-child(odd) >>>  .el-timeline-item__timestamp{
  position: absolute;
  left: -85px;
  top: 13px;
  color: #909399;
  line-height: 1;
  font-size: 13px;
}

</style>