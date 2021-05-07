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