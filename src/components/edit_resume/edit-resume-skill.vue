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

      <h3>专业技能</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section>
        <span>专业技能描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder="请输入掌握的相关技能。。。"
                      v-model="$store.state.previewResume.skill"
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
      oldSkill:'',
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
      this.$store.state.previewResume.skill = this.oldSkill
      //先将组件隐藏掉
      this.$store.commit('editSkillShow')
    },
    //将填写好的模块暂时保存在session中
    save() {
          //将修改内容存入session
        sessionStorage.setItem('previewResume',JSON.stringify(this.$store.state.previewResume))
        //将组件隐藏掉
        this.$store.commit('editSkillShow')
    }
  },
  created() {
    this.oldSkill = this.$store.state.previewResume.skill
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