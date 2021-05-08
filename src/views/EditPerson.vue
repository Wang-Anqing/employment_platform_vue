<template>
  <div>
    <HeaderCase></HeaderCase>
    <PersonCase></PersonCase>
    <div class="editInfo">
      <ul>
        <li>
          <span>用户昵称</span>
          <div style="width: 300px;display: inline-block">
            <el-input size="small" placeholder="请输入新昵称"></el-input>
          </div>
        </li>
        <li>
          <span>工作单位</span>
          <div style="width: 300px;display: inline-block">
            <el-input size="small" placeholder="请输入工作单位"></el-input>
          </div>
        </li>
        <li>
          <span>学校名称</span>
          <div style="width: 300px;display: inline-block">
            <el-input size="small" placeholder="请输入学校名称"></el-input>
          </div>
        </li>
        <li>
          <div>请选择新头像</div>
          <el-upload
              class="avatar-uploader"
              :data="this.uploadData"
              action="https://www.hualigs.cn/api/upload"
              :before-upload="beforeUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
            <img v-if="photo" :src="photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
      </ul>
    </div>
    <FooterCase></FooterCase>
  </div>
</template>

<script>
import HeaderCase from "@/components/Header";
import FooterCase from "@/components/Footerbox";
import PersonCase from "@/components/PersonBox";
export default {
  name: "EditPerson",
  components: {PersonCase, FooterCase, HeaderCase}
}
</script>

<style scoped>
@import "../css/common.css";
@import "../css/editPerson.css";
</style>