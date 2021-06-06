<template>
    <div class="body-cover" :style="bodyCoverStyle">
<!--      左侧导航栏-->
      <el-col :span="3">
        <el-menu
            :router="true"
            default-active="/company/index"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/company/index" style="margin-top: 200px">
            <i class="iconfont icon-qiye-copy-copy" style="margin-right: 5px"></i>
            <span slot="title">企业信息管理</span>
          </el-menu-item>
<!--          <el-menu-item index="2">-->
<!--            <i class="iconfont icon-zhaopin" style="margin-right: 5px"></i>-->
<!--            <span slot="title">招聘信息管理</span>-->
<!--          </el-menu-item>-->
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
        <h1 style="color: #fff;float:left;margin-left: 20px;line-height: 60px">企业信息管理</h1>
        <div style="color: #fff;float:right;width: 200px">
          <h3 style="height: 60px;line-height: 60px;margin-right: 15px;display: inline-block">{{company.number}}</h3>
          <a style="display:inline-block;height: 60px;width: 80px;cursor: pointer" @click="logout">
            <i class="iconfont icon-zhuxiao" style="width: 60px;height: 60px;font-size: 30px;color: #fff;line-height: 60px"></i>
          </a>
        </div>
      </div>
<!--      main-->
      <div class="company-index-main">
<!--        第一个form-->
        <div style="float:left;margin-top: 15px;width: 410px;border-right:1px solid #fff ">
          <el-form ref="form"  label-width="80px" style="width: 400px">
            <el-form-item label="用户名">
              <el-input v-model="company.number" ></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="company.password" show-password></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="company.email" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司名称">
              <el-input v-model="company.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="招聘描述">
              <el-input v-model="company.des" placeholder="例如：XXX公司2022暑期实习生"></el-input>
            </el-form-item>
            <el-form-item label="logo图片">

            </el-form-item>
            <el-form-item label="海报图片">

            </el-form-item>
          </el-form>
        </div>
<!--        第二个form-->
        <div style="float:left;margin-top: 15px;width: 410px;border-right:1px solid #fff ">
          <el-form ref="form"  label-width="80px" style="width: 400px">
            <el-form-item label="公司简介">
              <el-input v-model="company.introduce" type="textarea"
                        :rows="5"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="公司待遇">
              <el-input v-model="company.benefit" type="textarea"
                        :rows="5"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="基本要求">
              <el-input v-model="company.request" type="textarea"
                        :rows="5"
                        placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="内推起始">
              <el-date-picker
                  v-model="company.recomStartDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="内推截至">
              <el-date-picker
                  v-model="company.recomEndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>

          </el-form>
        </div>
<!--        第三个form-->
        <div style="float:left;margin-top: 15px;width: 410px;border-right:1px solid #fff ">
          <el-form ref="form"  label-width="80px" style="width: 400px">
            <el-form-item label="网申起始">
              <el-date-picker
                  v-model="company.applyStartDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="网申截至">
              <el-date-picker
                  v-model="company.applyEndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="笔试起始">
              <el-date-picker
                  v-model="company.writtenStartDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="笔试截至">
              <el-date-picker
                  v-model="company.writtenEndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="面试起始">
              <el-date-picker
                  v-model="company.interviewStartDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="面试截至">
              <el-date-picker
                  v-model="company.interviewEndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="offer发放">
              <el-date-picker
                  v-model="company.offerStartDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="offer截至">
              <el-date-picker
                  v-model="company.offerEndDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                  style="width: 320px"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="关键词">
              <el-input v-model="company.tag" placeholder="多个关键词用||隔开，最多四个关键词"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <a class="el-icon-check company-submit-btn" @click="updateCompany"></a>
      </div>
    </div>
</template>

<script>
    import moment from "moment";

    export default {
        name: "CompanyIndex",
        data(){
          return {
            bodyWidth:'',
            bodyHeight:'',
            bodyCoverStyle:'',
            company:{}
          }
        },
      methods:{
        updateCompany(){
          this.company.recomStartDate = moment(this.company.recomStartDate).format("YYYY-MM-DD")
          this.company.recomEndDate = moment(this.company.recomEndDate).format("YYYY-MM-DD")
          this.company.applyStartDate = moment(this.company.applyStartDate).format("YYYY-MM-DD")
          this.company.applyEndDate = moment(this.company.applyEndDate).format("YYYY-MM-DD")
          this.company.writtenStartDate = moment(this.company.writtenStartDate).format("YYYY-MM-DD")
          this.company.writtenEndDate = moment(this.company.writtenEndDate).format("YYYY-MM-DD")
          this.company.interviewStartDate = moment(this.company.interviewStartDate).format("YYYY-MM-DD")
          this.company.interviewEndDate = moment(this.company.interviewEndDate).format("YYYY-MM-DD")
          this.company.offerStartDate = moment(this.company.offerStartDate).format("YYYY-MM-DD")
          this.company.offerEndDate = moment(this.company.offerEndDate).format("YYYY-MM-DD")

          // console.log('company is ')
          // console.log(this.company)
          this.$axios.post("/api/company/update",JSON.stringify(this.company),{
            headers: {
              "Content-Type": "application/json;charset=utf-8", //头部信息
            }
          }).then(res => {
            this.$message({
              showClose: true,
              message: "企业信息更新完毕！！！",
              type: "success",
            });
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
        this.bodyWidth = window.innerWidth
        this.bodyHeight = window.innerHeight-1
        // this.bodyWidth = document.documentElement.clientWidth
        // this.bodyHeight = document.documentElement.clientHeight
        // console.log(this.bodyHeight) 720
        // console.log(this.bodyWidth) 1535
        this.bodyCoverStyle = 'width:'+this.bodyWidth+'px;height:'+this.bodyHeight+'px;background-color: rgba(255,254,253,.5)'
        // console.log(this.bodyCoverStyle)
        this.company = JSON.parse(sessionStorage.getItem('company'))
      },
    }
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/company/index.css";
@import "../../icon-font/font_company_aside/iconfont.css";
@import "../../icon-font/font_logout/iconfont.css";
.company-index-main >>> label {
  color: #fff;
}
</style>