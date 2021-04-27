<template>
  <el-tooltip class="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start" v-if="false">
    <el-button>下左</el-button>
  </el-tooltip>
</template>

<script>
    export default {
        name: "Test",
        data() {
            return {
                tableItem: []
            };
        },
        methods: {
            deleteItem(index) {
                console.log(this.tableItem[index].manAutoid)
            },
        },
        created() {
            //这里的this指的是vue对象，而回调函数里的this指的是回调函数
            let _this = this;
            axios.get('/api/manager/list').then(res => {
                _this.tableItem = res.data
                console.log(res)
                console.log('res里manAutoId为：' + res.data[0].manAutoid)
                console.log('res里manAutoId为：' + res.data[0].manAccount)
            })
        }
    }
</script>

<style scoped>

</style>