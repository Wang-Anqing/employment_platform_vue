<template>
  <div class="edit">
    <div class="edit-head clearfix">
      <a class="back"><&nbsp;返回</a>
      <h3>基本信息</h3>
      <a class="save">保存</a>
    </div>
    <div class="edit-body clearfix">
<!--      box1独占一行，box2一行两条信息-->
      <section class="box1">
        <span>姓名</span>
        <el-input  placeholder="如：王安青 WAQ" v-model="BaseInfo.name"
                   @change="setBaseInfo"></el-input>
      </section>
      <section class="box2">
        <span>电话</span>
        <el-input  placeholder="如：138-8888-8888" v-model="BaseInfo.phone"
                   @change="setBaseInfo"></el-input>
      </section>
      <section class="box3">
        <span>邮箱</span>
        <el-input  placeholder="如：abcdefg@163.com" v-model="BaseInfo.email"
                   @change="setBaseInfo"></el-input>
      </section>
      <section class="box1">
        <span>现居城市</span>
        <el-input  placeholder="如：北京" v-model="BaseInfo.location"
                   @change="setBaseInfo"></el-input>
      </section>
      <section class="box2">
        <span>民族</span>
        <el-input  placeholder="如：汉族" v-model="BaseInfo.nation"
                   @change="setBaseInfo"></el-input>
      </section>
      <section class="box3">
        <span>政治面貌</span>
        <el-select clearable placeholder="请选择"
                   style="display: inline-block;width: 270px"
                   v-model="BaseInfo.status"
                   @change="setBaseInfo"
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
                    v-model="BaseInfo.sex"
                   @change="setBaseInfo"
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
            v-model="BaseInfo.birth"
            @change="setBaseInfo"
            value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </section>
      <section class="box2">
        <span>求职意向</span>
        <el-input  placeholder="请填写意向岗位" v-model="BaseInfo.job"
                   @change="setBaseInfo"></el-input>
      </section>
      <section class="box3">
        <span>期望薪资</span>
        <el-input  placeholder="如：12K" v-model="BaseInfo.wage"
                   @change="setBaseInfo"></el-input>
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
      BaseInfo:{
        name:'',
        phone:'',
        email:'',
        location:'',
        nation:'',
        status:'',
        sex:'',
        birth:'',
        job:'',
        wage:''
      }
    }
  },
  methods:{
    setBaseInfo(){
      this.$emit('transferBaseInfo',this.BaseInfo)
    }
  }
}
</script>

<style scoped>
@import "../../css/edit-resume-head.css";
@import "../../css/common.css";
</style>