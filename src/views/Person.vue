<template>
    <div>
      <HeaderCase></HeaderCase>
      <person-case></person-case>
      <img :src="contentImg">
      <footer-case></footer-case>
    </div>
</template>

<script>
    import HeaderCase from "@/components/Header";
    import FooterCase from "@/components/Footerbox";
    import PersonCase from "@/components/PersonBox";
    export default {
        name: "Persion",
      components: {PersonCase, FooterCase, HeaderCase},
      data(){
          return{
            contentImg:require('../imgs/person-tip.png'),
          }
      },
      methods:{

      },
    }
</script>

<style scoped>
@import "../css/common.css";
@import "../css/person.css";
@import "../icon-font/font_person/iconfont.css";
</style>