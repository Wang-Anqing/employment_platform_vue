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
      <h3>项目经历</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section class="box2">
        <span>项目名称</span>
        <el-input  placeholder="请输入" v-model="$store.state.previewResume.program1Name"
        ></el-input>
      </section>
      <section class="box3">
        <span>你的角色</span>
        <el-input  placeholder="请输入" v-model="$store.state.previewResume.program1Role"
        ></el-input>
      </section>
      <section>
        <span>项目描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder="请说明你在项目中，做出了哪些贡献，完成了哪些功能，以及大致描述一下解决的问题"
                      v-model="$store.state.previewResume.program1Express"
                      defaultOpen="edit"></mavon-editor>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-resume-program",
  data(){
    return {
      //修改前的简历信息
      oldValue: {
        program1Name:'',
        program1Role:'',
        program1Express:''
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
      this.$store.commit('editProgramShow')
      //清除填写的信息
      this.$store.state.previewResume.program1Name = this.oldValue.program1Name
      this.$store.state.previewResume.program1Role = this.oldValue.program1Role
      this.$store.state.previewResume.program1Express = this.oldValue.program1Express
    },
    //将填写好的模块暂时保存在session中
    save() {
      //将修改内容存入session
      sessionStorage.setItem('previewResume',JSON.stringify(this.$store.state.previewResume))
      //将组件隐藏掉
        this.$store.commit('editProgramShow')

    }
  },
  created() {
    this.oldValue.program1Name = this.$store.state.previewResume.program1Name
    this.oldValue.program1Role = this.$store.state.previewResume.program1Role
    this.oldValue.program1Express = this.$store.state.previewResume.program1Express
  }
}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/edit-resume-program.css";
</style>