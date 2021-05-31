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
      <h3>基本信息</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
<!--      box1独占一行，box2一行两条信息-->
      <section class="box1">
        <span>姓名</span>
        <el-input  placeholder="如：王安青 WAQ" v-model="$store.state.previewResume.name"
                   ></el-input>
      </section>
      <section class="box2">
        <span>电话</span>
        <el-input  placeholder="如：138-8888-8888" v-model="$store.state.previewResume.phone"
                   ></el-input>
      </section>
      <section class="box3">
        <span>邮箱</span>
        <el-input  placeholder="如：abcdefg@163.com" v-model="$store.state.previewResume.email"
                   ></el-input>
      </section>
      <section class="box1">
        <span>现居城市</span>
        <el-input  placeholder="如：北京" v-model="$store.state.previewResume.location"
                   ></el-input>
      </section>
      <section class="box2">
        <span>民族</span>
        <el-input  placeholder="如：汉族" v-model="$store.state.previewResume.nation"
                   ></el-input>
      </section>
      <section class="box3">
        <span>政治面貌</span>
        <el-select clearable placeholder="请选择"
                   style="display: inline-block;width: 270px"
                   v-model="$store.state.previewResume.politicalStatus"

        >
          <el-option
              v-for="item in statusOptions"
              :key="item"
              :value="item">
          </el-option>
        </el-select>
      </section>
      <section class="box2">
        <span>性别</span>
        <el-select clearable placeholder="请选择"
                   style="display: inline-block;width: 270px"
                    v-model="$store.state.previewResume.sex"

        >
          <el-option
              v-for="item in sexOptions"
              :key="item"
              :value="item">
          </el-option>
        </el-select>
      </section>
      <section class="box3">
        <span>生日</span>
        <el-date-picker
            type="date"
            placeholder="选择日期"
            style="display: inline-block;width: 270px"
            v-model="$store.state.previewResume.birthday"
            value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </section>
      <section class="box2">
        <span>求职意向</span>
        <el-input  placeholder="请填写意向岗位" v-model="$store.state.previewResume.job"
                   ></el-input>
      </section>
      <section class="box3">
        <span>期望薪资</span>
        <el-input  placeholder="如：12K" v-model="$store.state.previewResume.wage"
                   ></el-input>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "edit-resume-head",
  data() {
    return {
      //修改前简历信息
      oldValue:{
        name:'',
        photo:'',
        job:'',
        wage:'',
        nation:'',
        phone:'',
        email:'',
        birthday:'',
        sex:'',
        politicalStatus:'',
        location:''
      },
      statusOptions:['中共党员','中共预备党员','共青团员','群众'],
      sexOptions:['女','男'],
      //是否全部填写
      isFull:false
    }
  },
  methods:{
    //  返回按钮功能
    goBack(){
      //先将组件隐藏掉
      this.$store.commit('editHeadShow')
      //清除填写的信息
      this.$store.state.previewResume.name = this.oldValue.name
      this.$store.state.previewResume.birthday = this.oldValue.birthday
      this.$store.state.previewResume.email = this.oldValue.email
      this.$store.state.previewResume.job = this.oldValue.job
      this.$store.state.previewResume.location = this.oldValue.location
      this.$store.state.previewResume.nation = this.oldValue.nation
      this.$store.state.previewResume.phone = this.oldValue.phone
      this.$store.state.previewResume.photo = this.oldValue.photo
      this.$store.state.previewResume.politicalStatus = this.oldValue.politicalStatus
      this.$store.state.previewResume.wage = this.oldValue.wage
      this.$store.state.previewResume.sex = this.oldValue.sex
    },
    //将填写好的模块暂时保存在session中
    save() {
      //将修改内容存入session
      sessionStorage.setItem('previewResume',JSON.stringify(this.$store.state.previewResume))
      //将组件隐藏掉
        this.$store.commit('editHeadShow')
    }
  },
  created() {
    this.oldValue.name = this.$store.state.previewResume.name
    this.oldValue.birthday = this.$store.state.previewResume.birthday
    this.oldValue.email = this.$store.state.previewResume.email
    this.oldValue.job = this.$store.state.previewResume.job
    this.oldValue.location = this.$store.state.previewResume.location
    this.oldValue.nation = this.$store.state.previewResume.nation
    this.oldValue.phone = this.$store.state.previewResume.phone
    this.oldValue.photo = this.$store.state.previewResume.photo
    this.oldValue.politicalStatus = this.$store.state.previewResume.politicalStatus
    this.oldValue.wage = this.$store.state.previewResume.wage
    this.oldValue.sex = this.$store.state.previewResume.sex
  }
}
</script>

<style scoped>
@import "../../css/edit-resume-head.css";
@import "../../css/common.css";
</style>