<template>
  <div>
    <HeaderCase></HeaderCase>
    <PersonCase></PersonCase>
    <h1 class="el-icon-caret-top" style="margin-top: 20px;margin-left: 25px">请选择要预览的简历</h1>
    <FooterCase></FooterCase>
  </div>
</template>

<script>
import HeaderCase from "@/components/Header";
import PersonCase from "@/components/PersonBox";
import FooterCase from "@/components/Footerbox";
export default {
  name: "Resume",
  components: {FooterCase, PersonCase, HeaderCase},
  data() {
    return {

    }
  },
}
</script>

<style scoped>

</style>