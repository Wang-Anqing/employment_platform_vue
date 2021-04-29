<template>
    <div>
        <Header></Header>
        <!--      header下面的banner模块-->
        <Bar></Bar>
        <!--      推荐模块-->
        <Recom @transferTag="getTag"></Recom>
        <!--      广告模块-->
        <Ad></Ad>
        <!--      职位推荐详情-->
        <Jobrecomlist :tag="tag"></Jobrecomlist>
        <!--      底部-->
        <Footerbox></Footerbox>
    </div>
</template>

<script>
    import Bar from "@/components/Bar";
    import Recom from "@/components/Recom";
    import Ad from "@/components/Ad";
    import Jobrecomlist from "@/components/Jobrecomlist";
    import Footerbox from "@/components/Footerbox";


    export default {
        name: "Index",
        components: {
            Footerbox,
            Jobrecomlist,
            Ad,
            Bar,
            Recom
        },
        data() {
            return {
                recomjonkind: 'aaa',
                tag:'all'
            }
        },
      methods:{
        getTag(msg){
          this.tag = msg
          console.log('tag is '+this.tag)
        } ,
      },
        created() {

        },
        watch: {

        }
    }
</script>

<style scoped>
@import "../css/common.css";
@import "../css/index-recomlist.css";
</style>