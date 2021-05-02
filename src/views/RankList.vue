<template>
  <div>
    <Header></Header>
    <section class="rankList0-section w clearfix">
      <!--        热搜榜-->
      <div class="rankList0 ">
        <div class="rankList0-head">
          <h2 class="title">热搜榜</h2>
        </div>
        <div class="rankList0-bd">
          <ul>
            <li class="rankList0-item" v-for="(item,index) in viewerList">
              <router-link tag="a" style="display:inline-block; cursor: pointer;width: 300px;height: 50px" :to="{path:'/jobdetail',query:{id: item.id}}">
                <i class="iconfont icon-diyi pre-icon" style="color: #ff3838;font-size: 20px" v-if="index === 0"></i>
                <i class="iconfont icon-dier pre-icon" style="color: #e67e22;font-size: 20px" v-if="index === 1"></i>
                <i class="iconfont icon-socar_Third_icon pre-icon" style="color: #9a6e3a;font-size: 20px" v-if="index === 2"></i>
                <span class="sort" v-if="index >= 3">{{index}}</span>
                <h3>{{item.name}}</h3>
                <i class="iconfont icon-new next-icon" style="color: #ff9f1a;font-size: 20px" v-if="item.isNew"></i>
                <i class="iconfont icon-hot next-icon" style="color: #eb3b5a;font-size: 20px" v-if="item.isHot"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!--        热投榜-->
      <div class="rankList0 ">
        <div class="rankList0-head">
          <h2 class="title">热投榜</h2>
        </div>
        <div class="rankList0-bd">
          <ul>
            <li class="rankList0-item" v-for="(item,index) in deliverList">
              <router-link tag="a" :to="{path:'/jobdetail',query:{id: item.id}}" style="display:inline-block; cursor: pointer;width: 300px;height: 50px">
                <i class="iconfont icon-diyi pre-icon" style="color: #ff3838;font-size: 20px" v-if="index === 0"></i>
                <i class="iconfont icon-dier pre-icon" style="color: #e67e22;font-size: 20px" v-if="index === 1"></i>
                <i class="iconfont icon-socar_Third_icon pre-icon" style="color: #9a6e3a;font-size: 20px" v-if="index === 2"></i>
                <span class="sort" v-if="index >= 3">{{index}}</span>
                <h3>{{item.name}}</h3>
                <i class="iconfont icon-new next-icon" style="color: #ff9f1a;font-size: 20px" v-if="item.isNew"></i>
                <i class="iconfont icon-hot next-icon" style="color: #eb3b5a;font-size: 20px" v-if="item.isHot"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <!--        活跃榜-->
      <div class="rankList0 " style="margin-right: 0">
        <div class="rankList0-head">
          <h2 class="title">活跃榜</h2>
        </div>
        <div class="rankList0-bd">
          <ul>
            <li class="rankList0-item" v-for="(item,index) in activityList">
              <router-link tag="a" :to="{path:'/jobdetail',query:{id: item.id}}" style="display:inline-block; cursor: pointer;width: 300px;height: 50px">
                <i class="iconfont icon-diyi pre-icon" style="color: #ff3838;font-size: 20px" v-if="index === 0"></i>
                <i class="iconfont icon-dier pre-icon" style="color: #e67e22;font-size: 20px" v-if="index === 1"></i>
                <i class="iconfont icon-socar_Third_icon pre-icon" style="color: #9a6e3a;font-size: 20px" v-if="index === 2"></i>
                <span class="sort" v-if="index >= 3">{{index}}</span>
                <h3>{{item.name}}</h3>
                <i class="iconfont icon-new next-icon" style="color: #ff9f1a;font-size: 20px" v-if="item.isNew"></i>
                <i class="iconfont icon-hot next-icon" style="color: #eb3b5a;font-size: 20px" v-if="item.isHot"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <Footerbox></Footerbox>
  </div>
</template>

<script>
import Footerbox from "@/components/Footerbox";
export default {
  name: "RankList",
  components:{
    Footerbox
  },
  data(){
    return{
      viewerList:'',
      deliverList:'',
      activityList:''
    }
  },
  created() {
    let _this = this;
    this.$axios.get('/api/getViewerList').then(res => {
      _this.viewerList = res.data
      console.log('viewerList is :')
      console.log(res)
    })
    this.$axios.get('/api/getActivityList').then(res => {
      _this.activityList = res.data
      console.log('activityList is :')
      console.log(res)
    })
    this.$axios.get('/api/getDeliverList').then(res => {
      _this.deliverList = res.data
      console.log('deliverList is :')
      console.log(res)
    })
  }
}
</script>

<style scoped>
@import "../icon-font/font_ranklist/iconfont.css";
@import "../icon-font/font_jobList/iconfont.css";
/*@import "../css/common.css";*/
@import "../css/rankList.css";
</style>