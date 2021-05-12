<template>
  <div>
    <button @click="getfloderID">获取文件夹ID</button>
  </div>
</template>

<script>
    export default {
        name: "Test",
        data() {
            return {
              testValue1:'',
              testValue2:'',
                view:false
            };
        },
        methods: {
          getfloderID(){
            this.$axios.post('https://www.hualigs.cn/api/folderList',{
              token:' bd72c92dc223c3d3128d674eb3f70625 '
            }).then(res => {
              console.log('请求成功')
              console.log(res)
            })
          }
        },
      created() {
          this.testValue1 = this.$store.state.test
          this.testValue2 = this.$store.state.test
          this.testValue1 = 'bbbbb'
        console.log('value1 is :')
        console.log(this.testValue1)
        console.log('value2 is :')
        console.log(this.testValue2)
      }
    }
</script>

<style scoped>
button {
  display: block;
  width: 120px;
  height: 50px;
  margin: 20px auto;
}
</style>