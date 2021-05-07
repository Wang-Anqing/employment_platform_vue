<template>
  <div class="edit">
    <div class="edit-head clearfix">
      <a class="back" @click="goBack"><&nbsp;返回</a>
      <h3>基本信息</h3>
      <a class="save" @click="save">保存</a>
    </div>
    <div class="edit-body clearfix">
<!--      box1独占一行，box2一行两条信息-->
      <section class="box1">
        <span>姓名</span>
        <el-input  placeholder="如：王安青 WAQ" v-model="$store.state.BaseInfo.name"
                   ></el-input>
      </section>
      <section class="box2">
        <span>电话</span>
        <el-input  placeholder="如：138-8888-8888" v-model="$store.state.BaseInfo.phone"
                   ></el-input>
      </section>
      <section class="box3">
        <span>邮箱</span>
        <el-input  placeholder="如：abcdefg@163.com" v-model="$store.state.BaseInfo.email"
                   ></el-input>
      </section>
      <section class="box1">
        <span>现居城市</span>
        <el-input  placeholder="如：北京" v-model="$store.state.BaseInfo.location"
                   ></el-input>
      </section>
      <section class="box2">
        <span>民族</span>
        <el-input  placeholder="如：汉族" v-model="$store.state.BaseInfo.nation"
                   ></el-input>
      </section>
      <section class="box3">
        <span>政治面貌</span>
        <el-select clearable placeholder="请选择"
                   style="display: inline-block;width: 270px"
                   v-model="$store.state.BaseInfo.status"

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
                    v-model="$store.state.BaseInfo.sex"

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
            v-model="$store.state.BaseInfo.birth"
            value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </section>
      <section class="box2">
        <span>求职意向</span>
        <el-input  placeholder="请填写意向岗位" v-model="$store.state.BaseInfo.job"
                   ></el-input>
      </section>
      <section class="box3">
        <span>期望薪资</span>
        <el-input  placeholder="如：12K" v-model="$store.state.BaseInfo.wage"
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
      this.$store.commit('cleanBaseInfo')
    },
    //将填写好的模块暂时保存在session中
    save() {
      for (let key in this.$store.state.BaseInfo) {
        if (this.$store.state.BaseInfo[key] === ''){
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
        sessionStorage.setItem('name',this.$store.state.BaseInfo.name)
        sessionStorage.setItem('phone',this.$store.state.BaseInfo.phone)
        sessionStorage.setItem('email',this.$store.state.BaseInfo.email)
        sessionStorage.setItem('location',this.$store.state.BaseInfo.location)
        sessionStorage.setItem('nation',this.$store.state.BaseInfo.nation)
        sessionStorage.setItem('status',this.$store.state.BaseInfo.status)
        sessionStorage.setItem('sex',this.$store.state.BaseInfo.sex)
        sessionStorage.setItem('birth',this.$store.state.BaseInfo.birth)
        sessionStorage.setItem('job',this.$store.state.BaseInfo.job)
        sessionStorage.setItem('wage',this.$store.state.BaseInfo.wage)
        //将组件隐藏掉
        this.$store.commit('editHeadShow')
      }
    }
  },
  computed: {

  }
}
</script>

<style scoped>
@import "../../css/edit-resume-head.css";
@import "../../css/common.css";
</style>