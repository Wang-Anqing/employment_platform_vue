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
          <div class="card-main w clearfix">
            <h1>全部企业</h1>
<!--            关键词部分-->
            <div class="card-main-body">
              <div class="card-main-keyword">
                <div>
                  <span class="keyword-lable">关键词</span>
                  <div class="keyword-box clearfix">
                    <a  v-for="(item,index) in keyword" v-bind:class="{keyword: true,selected:index===isSelected} "
                        @click="selectJob(item,index)">{{item}}</a>
                  </div>
                </div>
              </div>
              <div class="main-compamy">
                <ul class="companyList clearfix">
<!--                  卡片整体-->
                  <li class="card" v-for="item in companyCard">
<!--                    公司的logo-->
                    <a class="card-pic">
                      <img :src="item.logoSrc">
                    </a>
<!--                    卡片主体-->
                    <div class="card-body">
<!--                      公司名称-->
                      <h2>{{item.name}}</h2>
<!--                      hot或者new状态-->
                      <div class="card-state">
                        <span v-if="item.isNew==='1'" class="iconfont icon-new" style="color: #e67e22;font-size: 20px"></span>
                        <span v-if="item.isHot==='1'" class="iconfont icon-hot" style="color: #d63031;font-size: 20px"></span>
                      </div>
<!--                      公司标签-->
                      <div class="card-tag">
                        <a v-for="tag0 in item.tag">{{tag0}}</a>
                      </div>
<!--                      职位数量统计和投递按钮-->
                      <div class="job-info">
                        <p>{{item.account}}个职位开放投递中</p>
                        <router-link tag="a" class="act-btn" :to="{path:'/jobdetail',query:{id: item.id}}" >立即投递</router-link>
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
              isSelected: 0,
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
                ],
                companyCard:[{
                  id:'',
                  name:'',
                  logoSrc:'',
                  isHot:'',
                  isNew:'',
                  tag:[],
                  account:''
                }]
            }
        },
      methods:{
        //  选中标签，更新页面内容
        selectJob(keyword,index){
          this.isSelected = index
          if (keyword === '全部'){
            this.jobkind = 'all'
          }else {
            this.jobkind = keyword
          }
          let _this = this
          this.$axios.get('/api/init/companyListCard/'+_this.jobkind).then(res=>{
            console.log(res)
            let len = res.data.length;
            _this.companyCard = res.data
            for (let i = 0; i<_this.companyCard.length;i++){
              _this.companyCard[i].tag = _this.companyCard[i].tag.split("||")
            }
            console.log('companyCard is :')
            console.log(_this.companyCard)
          })
        },
      //  更改标签选中样式
        isSelect(item) {

        }
      },
        created() {
          let _this = this;
            this.jobkind = this.$route.params.jobkind;
            if(this.jobkind === 'all'){
              this.$axios.get('/api/init/companyListCard/'+_this.jobkind).then(res=>{
                console.log(res)
                let len = res.data.length;
                _this.companyCard = res.data
                for (let i = 0; i<_this.companyCard.length;i++){
                  _this.companyCard[i].tag = _this.companyCard[i].tag.split("||")
                }
                console.log('companyCard is :')
                console.log(_this.companyCard)
              })
            }
        }
    }
</script>

<style scoped>
@import "../css/joblist.css";
@import "../css/common.css";
@import "../icon-font/font_rgs7j50c23/iconfont.css";
</style>