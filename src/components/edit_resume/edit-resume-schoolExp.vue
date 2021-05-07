<template>
  <div class="edit">
    <div class="edit-head clearfix">
      <a class="back" @click="goBack"><&nbsp;返回</a>
      <h3>校内经历</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section class="box2">
        <span>名称</span>
        <el-input  placeholder="请输入" v-model="$store.state.SchoolExp.name"
        ></el-input>
      </section>
      <section class="box3">
        <span>你的角色</span>
        <el-input  placeholder="请输入" v-model="$store.state.SchoolExp.role"
        ></el-input>
      </section>
      <section>
        <span>经历描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder="请说明你在活动中，做出了哪些贡献，完成了哪些功能，以及大致描述一下解决的问题"
                      v-model="$store.state.SchoolExp.express"
                      defaultOpen="edit"></mavon-editor>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-resume-schoolExp",
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
      this.$store.commit('editSchoolExpShow')
      //清除填写的信息
      this.$store.commit('cleanSchoolExp')
    },
    //将填写好的模块暂时保存在session中
    save() {
      for (let key in this.$store.state.SchoolExp) {
        if (this.$store.state.SchoolExp[key] === ''){
          this.isFull = false
          this.$message({
            message: '内容未填写完整！！！',
            type: 'warning'
          });
          break
        }else {
          this.isFull = true
        }
      }
      if (this.isFull){
        sessionStorage.setItem('schoolExp-name',this.$store.state.SchoolExp.name)
        sessionStorage.setItem('schoolExp-role',this.$store.state.SchoolExp.role)
        sessionStorage.setItem('schoolExp-express',this.$store.state.SchoolExp.express)
        //将组件隐藏掉
        this.$store.commit('editSchoolExpShow')
      }
    }
  }
}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/edit-resume-program.css";
</style>