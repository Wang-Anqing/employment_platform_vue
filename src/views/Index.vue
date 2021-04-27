<template>
    <div>
        <Header></Header>
        <!--      header下面的banner模块-->
        <Bar></Bar>
        <!--      推荐模块-->
        <Recom></Recom>
        <!--      广告模块-->
        <Ad></Ad>
        <!--      职位推荐详情-->
        <Jobrecomlist></Jobrecomlist>
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
                recomjonkind: 'aaa'
            }
        },
        created() {
            this.recomjonkind = this.$route.query.jobkind;
            const jobKind = this.recomjonkind;
            if (jobKind === undefined) {
                console.log('推荐了all')
            } else {
                console.log('刚才推荐了' + jobKind)
            }
        },
        watch: {
            $route(to, from) {
                if (to.query.jobkind !== from.query.jobkind) {
                    location.reload();

                }
            }
        }
    }
</script>

<style scoped>
@import "../css/common.css";
@import "../css/index-recomlist.css";
</style>