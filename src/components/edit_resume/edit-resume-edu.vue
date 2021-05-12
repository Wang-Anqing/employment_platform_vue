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
      <h3>教育经历</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section class="box2">
        <span>学校</span>
        <el-input  placeholder="请输入" v-model="$store.state.previewResume.school"
        ></el-input>
      </section>
      <section class="box3">
        <span>专业</span>
        <el-input  placeholder="请输入" v-model="$store.state.previewResume.profession"
        ></el-input>
      </section>
      <section class="box3">
        <span>学历</span>
        <el-select clearable placeholder="请选择"
                   style="display: inline-block;width: 270px"
                   v-model="$store.state.previewResume.background">
          <el-option
              v-for="item in backgroundOptions"
              :key="item"
              :value="item">
          </el-option>
        </el-select>
      </section>
      <section class="box2">
        <span>学院</span>
        <el-input  placeholder="请输入" v-model="$store.state.previewResume.academy"
        ></el-input>
      </section>
      <section>
        <span>经历描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder=""
                      v-model="$store.state.previewResume.eduExpress"
                      defaultOpen="edit"></mavon-editor>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-resume-edu",
  data(){
    return {
      //存储原本简历信息
      oldValue:{
        school:'',
        profession:'',
        academy:'',
        background:'',
        eduExpress:''
      },
      isFull:'',
      backgroundOptions:['中专','大专','本科','硕士','博士','MBA'],
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
      this.$store.commit('editEduShow')
      //清除填写的信息
      this.$store.state.previewResume.school = this.oldValue.school
      this.$store.state.previewResume.academy = this.oldValue.academy
      this.$store.state.previewResume.background = this.oldValue.background
      this.$store.state.previewResume.profession = this.oldValue.profession
      this.$store.state.previewResume.eduExpress = this.oldValue.eduExpress
    },
    //将填写好的模块暂时保存在session中
    save() {
        //将修改内容存入session
      sessionStorage.setItem('previewResume',JSON.stringify(this.$store.state.previewResume))
        //将组件隐藏掉
        this.$store.commit('editEduShow')
    }
  },
  created() {
    this.oldValue.school = this.$store.state.previewResume.school
    this.oldValue.academy = this.$store.state.previewResume.academy
    this.oldValue.background = this.$store.state.previewResume.background
    this.oldValue.profession = this.$store.state.previewResume.profession
    this.oldValue.eduExpress = this.$store.state.previewResume.eduExpress
  }
}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/edit-resume-edu.css";
</style>