<template>
<div>
  <div id="pdfDom" style="width: 500px; height: 300px;background-color:red;">
  </div>
  <button style="height: 70px;width: 100px; margin: 0 auto;" @click="getPdf()">导出为PDF</button>
</div>
</template>

<script>
export default {
name: "Test1",
  data(){
    return {
      htmlTitle:'测试用PDF'
    }
  }
}
</script>

<style scoped>

</style>