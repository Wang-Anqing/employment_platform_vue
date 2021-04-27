<template>
    <div class="">
      <Header></Header>
      <div class="clearfix w">
<!--         左侧公司信息-->
        <div class="main">
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
              <el-collapse-item  v-for="item in job" :name=item.id style="width: 780px">
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
                <a class="sendResum" onclick="alert('投递成功！！！')">立即投递</a>
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
          dateFormat(date){
            if (date === null)
              return null;
            else{
              let date1 = moment(date).format('YYYY-MM-DD')
              return date1
            }
          }
      },
      created() {
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