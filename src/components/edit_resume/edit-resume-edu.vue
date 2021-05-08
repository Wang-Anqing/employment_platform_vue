<template>
  <div class="edit">
    <div class="edit-head clearfix">
      <a class="back" @click="goBack"><&nbsp;返回</a>
      <h3>教育经历</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
      <section class="box2">
        <span>学校</span>
        <el-input  placeholder="请输入" v-model="$store.state.EduInfo.school"
        ></el-input>
      </section>
      <section class="box3">
        <span>专业</span>
        <el-input  placeholder="请输入" v-model="$store.state.EduInfo.profession"
        ></el-input>
      </section>
      <section class="box3">
        <span>学历</span>
        <el-select clearable placeholder="请选择"
                   style="display: inline-block;width: 270px"
                   v-model="$store.state.EduInfo.background">
          <el-option
              v-for="item in backgroundOptions"
              :key="item"
              :value="item">
          </el-option>
        </el-select>
      </section>
      <section class="box2">
        <span>学院</span>
        <el-input  placeholder="请输入" v-model="$store.state.EduInfo.academy"
        ></el-input>
      </section>
      <section>
        <span>经历描述</span>
        <mavon-editor :toolbars="toolbars"
                      style="margin-top: 5px;"
                      placeholder=""
                      v-model="$store.state.EduInfo.eduExp"
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
      this.$store.commit('cleanEduInfo')
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
        sessionStorage.setItem('school',this.$store.state.EduInfo.school)
        sessionStorage.setItem('profession',this.$store.state.EduInfo.profession)
        sessionStorage.setItem('academy',this.$store.state.EduInfo.academy)
        sessionStorage.setItem('background',this.$store.state.EduInfo.background)
        sessionStorage.setItem('schoolExp',this.$store.state.EduInfo.schoolExp)
        //将组件隐藏掉
        this.$store.commit('editEduShow')
      }
      console.log(this.$store.state.EduInfo.schoolExp)
      // console.log('schoolExp3-express is :')
      // console.log(sessionStorage.getItem('schoolExp3-express'))
    }
  }
}
</script>

<style scoped>
@import "../../css/common.css";
@import "../../css/edit-resume-edu.css";
</style>