<template>
    <div class="jobList">
        <Header></Header>
        <section>
<!--          头部搜索框部分-->
          <div class="act-banner">
            <h1>2021&nbsp;名企招聘日程</h1>
            <div class="banner-slogan">
              <span>一站关注企业招聘动态</span>
              <span>一站获取所有名企信息</span>
              <span class="final">一站满足你的招聘需求</span>
            </div>
            <div class="campus-search">
              <input type="text" placeholder="输入公司名称进行搜索"></input>
              <i class="btn-search"></i>
            </div>
          </div>
<!--          主体部分-->
          <div class="main w clearfix">
            <h1>全部企业</h1>
<!--            关键词部分-->
            <div class="main-body">
              <div class="main-keyword">
                <div>
                  <span class="keyword-lable">关键词</span>
                  <div class="keyword-box clearfix">
                    <a class="keyword" v-for="item in keyword">{{item}}</a>
                  </div>
                </div>
              </div>
              <div class="main-compamy">
                <ul class="companyList clearfix">
<!--                  卡片整体-->
                  <li class="card">
<!--                    公司的logo-->
                    <a class="card-pic">
                      <img >
                    </a>
<!--                    卡片主体-->
                    <div class="card-body">
<!--                      公司名称-->
                      <h2> </h2>
<!--                      hot或者new状态-->
                      <div class="card-state">
                        <span></span>
                        <span></span>
                      </div>
<!--                      公司标签-->
                      <div class="card-tag">
                        <a></a>
                      </div>
<!--                      职位数量统计和投递按钮-->
                      <div class="job-info">
                        <p> </p>
                        <a class="act-btn">立即投递</a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </section>
      <Footerbox></Footerbox>
    </div>
</template>

<script>

    import Footerbox from "@/components/Footerbox";
    export default {
        name: "JobList",
      components: {Footerbox},
      data() {
            return {
                jobkind: '',
                keyword:[
                    '全部',
                    '金融',
                    '算法',
                    '嵌入式',
                    '通信',
                    'Java',
                    'WEB',
                    'Android',
                    'IOS',
                    '测试',
                    '安全',
                    '运维',
                    '后台',
                    '测试',
                    '机器',
                    '大数据',
                    '网络安全',
                    '新闻传媒',
                    'UI设计',
                    '产品经理',
                    '项目经理',
                    '房地产',
                    '快消',
                    '通信',
                    '制造业',
                    '零售业',
                    '房地产',
                    '社交',
                    '文娱内容',
                    '新能源',
                    '硬件',
                    '会计事务所',
                    '军工企业'
                ]
            }
        },
        created() {
            this.jobkind = this.$route.query.jobkind;
            console.log('当前页面为' + this.jobkind)
        }
    }
</script>

<style scoped>
@import "../css/joblist.css";
@import "../css/common.css";
</style>