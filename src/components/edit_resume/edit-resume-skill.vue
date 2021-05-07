<template>
  <div class="edit">
    <div class="edit-head clearfix">
      <a class="back" @click="goBack"><&nbsp;返回</a>
      <h3>专业技能</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section>
        <span>专业技能描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder=""
                      v-model="$store.state.Skill"
                      defaultOpen="edit"></mavon-editor>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-resume-skill",
  data() {
    return{
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
      this.$store.commit('editSkillShow')
      //清除填写的信息
      this.$store.commit('cleanSkill')
    },
    //将填写好的模块暂时保存在session中
    save() {
      for (let key in this.$store.state.EduInfo) {
        if (this.$store.state.EduInfo[key] === ''){
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
        sessionStorage.setItem('skill',this.$store.state.Skill)
        //将组件隐藏掉
        this.$store.commit('editSkillShow')
      }
      console.log(this.$store.state.EduInfo.schoolExp)
    }
  }
}
</script>

<style scoped>
@import "../../css/common.css";
.edit {
  float: left;
  display: inline-block;
  width: 580px;
  height: auto;
  margin: 25px auto;
  margin-right: 40px;
  padding: 15px;
  background-color: #ffffff;
  border-top: 1px solid transparent;
}
.edit-head {
  height: 50px;
  border-bottom: 1px solid #a3a3a3;display: block;
  margin-left: 0;
  margin-bottom: 5px;
}
.edit-body {
  margin-top: 10px;
}
.edit-head .back {
  width: 70px;
  height: 30px;
  float: left;
  line-height: 30px;
  cursor: pointer;
}
.edit-head h3 {
  display: inline-block;
}
.edit-head .save {
  width: 70px;
  height: 30px;
  float: right;
  color: #00a4ff;
  line-height: 30px;
  border: 1px solid #00a4ff;
  border-radius: 15px;
  cursor: pointer;
}
</style>