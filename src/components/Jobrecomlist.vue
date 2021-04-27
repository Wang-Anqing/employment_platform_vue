<template>
    <div>
        <!-- 职位推荐详情页 -->
        <div class="box w">
            <div class="box-hd">
                <h3>职位推荐</h3>
            </div>
            <div class="box-bd">
                <ul class="clearfix">
                    <li v-for="item in recomJobList">
                        <router-link tag="a" :to="{path:'/jobdetail',query:{id: item.id}}">
                          <img :src="newSrc" class="newtag" v-if='item.isNew==="1"'>
                          <img :src='hotSrc' alt="" class="hottag" v-if="item.isHot==='1'">
                          <img :src="item.postSrc">
                          <h4>{{item.des}} </h4>
                          <div class="info">
                            • {{ item.viewer }}人浏览
                          </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Jobrecomlist",
        data() {
            return {
                recomJobList: [
                  {
                    id:'',
                    name:'',
                    isHot:'',
                    isNew:'',
                    postSrc:'',
                    des:'',
                    viewer:''
                  }
                ],
                hotSrc: require('../imgs/hot.png'),
                newSrc: require('../imgs/new.png')
            }
        },
      created() {
        let _this = this;
        axios.get('/api/init/recomCard').then(res =>{
          _this.recomJobList = res.data
          console.log(res)
        })
      }
    }
</script>

<style src="../css/common.css"></style>
<style src="../css/index-recomlist.css"></style>
<style scoped>

</style>