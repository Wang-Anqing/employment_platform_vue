<template>
  <div>
    <header-case></header-case>
    <person-case></person-case>
    <div class="w clearfix">
      <div>
<!--        投递简历的不同处理程度-->
        <div style="width: 1200px;background-color:#fff;">
          <ul class="post-kind clearfix">
            <li :class="{'title':true,'active':index == selectedIndex}" v-for="(item,index) in postKind" @click="selected(index)">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>
<!--        投递详情-->
        <div>
          <div class="deliver-body">
            <ul>
              <li class="deliver-body-item" v-for="(item) in infoItems">
                <h3 class="jobName">{{item.jobName}}</h3>
                <h4 class="operateDate">{{item.operateDate}}</h4>
                <h4 class="companyName">{{item.companyName}}</h4>
                <h4 class="resume-title">使用简历：{{item.title}}</h4>
                <h2 class="tip">{{tips[selectedIndex]}}</h2>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="infoItems.length==0">
          <h1>暂时没有处理进度哦，请再等等\(￣︶￣*\))</h1>
        </div>
      </div>
    </div>
    <footer-case></footer-case>
  </div>
</template>

<script>
import HeaderCase from "@/components/Header";
import PersonCase from "@/components/PersonBox";
import FooterCase from "@/components/Footerbox";
import moment from "moment";
export default {
name: "Delivered",
  components: {FooterCase, PersonCase, HeaderCase},
  data(){
    return {
      postKind:['已投递','被查看','初筛','笔试','面试','未通过','录用'],
      selectedIndex:0,
      deliveredInfo:[],
      infoItems:[],
      tips:[
          '投递成功',
          '被查看',
          '初筛中',
          '进行笔试',
          '进行面试',
          '很遗憾',
          '恭喜你'
      ]
    }
  },
  methods: {
    selected(index){
      //改变点击的标题
      this.selectedIndex = index;

      //改变显示的内容
      this.infoItems.length = 0
      let deliveredInfo1 = this.deliveredInfo
      for (let key in deliveredInfo1) {
        if (deliveredInfo1[key].state === index){
          this.infoItems.push(deliveredInfo1[key])
        }
      }
      console.log('info items is :')
      console.log(this.infoItems)
    }
  },
  created() {
    this.$axios.post("/api/getResumeState",{
      jobseekerId: JSON.parse(this.$store.state.jobseeker).id
    }).then((res) => {
      // console.log("投递状态记录为：")
      // console.log(res)
      let info = res.data
      for (let infoKey in info) {
        info[infoKey].operateDate = moment(info[infoKey].operateDate).format('YYYY-MM-DD HH:mm:ss')
      }
      // console.log('info is :')
      // console.log(info)
      this.deliveredInfo = info
      // console.log("deliveredInfo is :")
      // console.log(this.deliveredInfo)
    })
  }
}
</script>

<style scoped>
@import "../css/common.css";
@import "../css/delivered.css";
</style>