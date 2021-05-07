<template>
  <div class="edit">
    <div class="edit-head clearfix">
      <a class="back" @click="goBack"><&nbsp;返回</a>
      <h3>个人总结</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section>
        <span>个人描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder="请输入对自己的客观、全面的总结"
                      v-model="$store.state.Conclusion"
                      defaultOpen="edit"></mavon-editor>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-resume-conclusion",
  data(){
    return {
      isFull:'',
      //md工具栏选项
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        ol: true, // 有序列表
        ul: true, // 无序列表
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
      }
    }
  },
  methods:{
    //  返回按钮功能
    goBack(){
      //先将组件隐藏掉
      this.$store.commit('editConclusionShow')
      //清除填写的信息
      this.$store.commit('cleanConclusion')
    },
    //将填写好的模块暂时保存在session中
    save() {
      if (this.$store.state.Conclusion === ''){
        this.isFull = false
        this.$message({
          message: '内容未填写完整！！！',
          type: 'warning'
        });
      }else {
        this.isFull = true
      }
      if (this.isFull){
        sessionStorage.setItem('conclusion',this.$store.state.Conclusion)
        //将组件隐藏掉
        this.$store.commit('editConclusionShow')
      }
    }
  }
}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/edit-resume-program.css";
</style>