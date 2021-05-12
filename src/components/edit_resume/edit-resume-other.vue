<template>
  <div class="edit">
    <div class="edit-head clearfix">
      <el-popconfirm
          confirm-button-text='确认返回'
          cancel-button-text='点错了'
          icon="el-icon-info"
          icon-color="red"
          title="返回将不保存修改，请问是否返回？"
          @confirm="goBack"
      >
        <a class="back" slot="reference"><&nbsp;返回</a>
      </el-popconfirm>
      <h3>其他</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section>
        <span>描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder="例如：四六级成绩、各种证书或其他荣誉"
                      v-model="$store.state.previewResume.others"
                      defaultOpen="edit"></mavon-editor>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-resume-other",
  data(){
    return {
      //修改前简历信息
      oldValue: {
        others:''
      },
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
      this.$store.commit('editOtherShow')
      this.$store.state.previewResume.others = this.oldValue.others
    },
    //将填写好的模块暂时保存在session中
    save() {
      //将修改内容存入session
      sessionStorage.setItem('previewResume',JSON.stringify(this.$store.state.previewResume))
      //将组件隐藏掉
      this.$store.commit('editOtherShow')
    }
  },
  created() {
    this.oldValue.others = this.$store.state.previewResume.others
  }
}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/edit-resume-program.css";
</style>