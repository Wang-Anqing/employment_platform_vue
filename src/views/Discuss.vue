<template>
    <div>
      <header-case></header-case>
      <div class="discuss w clearfix">
        <div class="discuss-head w clearfix">
<!--          类别选择-->
          <el-select  placeholder="请选择帖子分类" v-model="selectedType" style="float:left;" @change="selectType">
            <el-option v-for="(item,index) in types" :key="item.type"
                       :label="item.title" :value="item.type" style="height: 50px;position: relative">
              <div style="width: 100%;height: 20px;">
                <span :style="item.color" style="display:inline-block;width: 20px;height: 20px;"></span>
                <span style="display:inline-block;
                font-size: 14px;height: 20px;line-height: 20px;position:absolute;top: 2px;margin-left: 5px"
                >{{item.title}}</span>
              </div>
              <div style="color: #969896">{{item.des}}</div>
            </el-option>
          </el-select>
<!--          发帖按钮-->
          <div class="add-discuss" @click="createDiscuss">
            <a>
              <span class="el-icon-plus"></span>
              <span>发 帖</span>
            </a>
          </div>
<!--          发帖dialog-->
          <el-dialog
              title="发布帖子"
              :visible.sync="showNewDiscussDialog"
              width="35%"
              style="height: 550px"
              :before-close="hiddenDiscuss"
              >
            <el-form :model="newDiscuss" ref="form" label-width="80px">
              <el-form-item label="帖子主题">
                <el-input v-model="newDiscuss.title" autocomplete="off" placeholder="请输入帖子主题"></el-input>
              </el-form-item>
              <el-form-item label="帖子类型">
                <el-select v-model="newDiscuss.type" placeholder="选择帖子类型" style="width: 466px">
                  <el-option v-for="(item,index) in types" :key="item.type" v-if="!(index == 0)"
                             :label="item.title" :value="item.type" style="height: 50px;position: relative">
                    <div style="width: 100%;height: 20px;">
                      <span :style="item.color" style="display:inline-block;width: 20px;height: 20px;"></span>
                      <span style="display:inline-block;
                font-size: 14px;height: 20px;line-height: 20px;position:absolute;top: 2px;margin-left: 5px"
                      >{{item.title}}</span>
                    </div>
                    <div style="color: #969896">{{item.des}}</div>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="帖子内容">
                <mavon-editor :toolbars="toolbars"
                              placeholder="请输入帖子内容..."
                              v-model="newDiscuss.content"
                              defaultOpen="edit"></mavon-editor>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="hiddenDiscuss">取 消</el-button>
              <el-button type="primary" @click="addDiscuss">发 布</el-button>
            </span>
          </el-dialog>
        </div>
<!--        帖子标签-->
        <div class="discuss-label clearfix">
          <span style="float:left;">主题</span>
          <span style="float:right;">发布日期</span>
          <span style="float:right;">浏览人数</span>
          <span style="float:right;">发帖人</span>
        </div>
<!--        主贴展示-->
        <div>
          <ul class="discuss-body clearfix">
            <li class="discuss-item" v-for="(item,index) in discussFromServe"  @click="showDetail(index)">
              <h2 class="discuss-title">{{item.title}}</h2>
              <div class="discuss-type-label">
                <span :style="types[item.type].color" class="span1"></span>
                <span class="span2">{{types[item.type].title}}</span>
              </div>
              <div class="discuss-date">{{item.date}}</div>
              <div class="discuss-viewer">{{item.viewer}}</div>
              <div class="discuss-userHeader">
                <img :src="item.userHeader" :title="item.userName">
              </div>
            </li>
          </ul>
        </div>
<!--        帖子详情页-->
        <el-dialog
            :before-close="swagLike"
            :title="detail.title"
            :visible.sync="detailDialogShow"
            width="30%">
          <ul>
            <li class="clearfix" style="border-bottom: 1px solid #cbcbcb;position: relative;margin-bottom: 13px">
              <div style="height: 40px">
                <span style="display: inline-block;
                 width: 50px;
                 height: 50px;
                 border-radius: 50%;
                 position: absolute;
                 top: -13px;
                 left: 0px;
                "><img :src="detail.userHeader" style="width: 50px;height: 50px;border-radius: 50%"></span>
                <span style="position: absolute;left: 65px">{{detail.userName}}</span>
                <span style="float:right;margin-right: 10px;">{{detail.date}}</span>
              </div>
              <mavon-editor
                  :value="detail.content"
                  :subfield = "markConfig.subfield"
                  :defaultOpen = "markConfig.defaultOpen"
                  :toolbarsFlag = "markConfig.toolbarsFlag"
                  :editable="markConfig.editable"
                  :scrollStyle="markConfig.scrollStyle"
                  :boxShadow="markConfig.boxShadow"
                  :previewBackground="markConfig.previewBackground"
              ></mavon-editor>
              <div style="width: 150px; height: 30px;line-height: 30px;float:right;">
<!--                点赞部分-->
                <span style="display: inline-block;height: 30px;width:60px;float:left;line-height: 30px">
                  <i class="el-icon-star-off"
                     v-if="!isLike"
                     style="color: #00a4ff;font-size: 25px;cursor: pointer" @click="like"></i>
                  <i class="el-icon-star-on"
                     v-if="isLike"
                     style="color: #00a4ff;font-size: 27px;cursor: pointer" @click="dislike"></i>
                  <span style="font-size: 16px;float:right;color: #00a4ff">({{detail.likes}})</span>
                </span>
<!--                回帖按钮部分-->
                <span style="display: inline-block;height: 30px;width: 60px;float:right;line-height: 30px;cursor: pointer"
                      @click="createReply"
                >
                  <i class="el-icon-chat-dot-square"
                      style="color: #00a4ff;font-size: 25px;float:left;"
                  ></i>
                  <span style="font-size: 16px;float:right;color: #00a4ff">回帖</span>
                </span>
                <el-dialog
                    width="30%"
                    title="内层 Dialog"
                    :visible.sync="showNewReply"
                    append-to-body>
                  <el-form :model="newReply" ref="form" label-width="80px">
                    <el-form-item label="回帖内容">
                      <mavon-editor :toolbars="toolbars"
                                    placeholder="请输入帖子内容..."
                                    v-model="newReply.content"
                                    defaultOpen="edit"
                                    class="newReply-content"
                      ></mavon-editor>
                    </el-form-item>
                  </el-form>
                  <div slot="footer">
                    <el-button @click="hiddenReply">取 消</el-button>
                    <el-button type="primary" @click="addReply">跟 帖</el-button>
                  </div>
                </el-dialog>
              </div>
            </li>
<!--            跟帖部分-->
            <li v-for="item in reply" class="discuss-reply">
              <div class="reply-header">
                <img :src="item.userHeader">
              </div>
              <div class="reply-username">{{item.userName}}</div>
              <div class="reply-date">{{item.date}}</div>
              <mavon-editor
                  :value="item.content"
                  :subfield = "markConfig.subfield"
                  :defaultOpen = "markConfig.defaultOpen"
                  :toolbarsFlag = "markConfig.toolbarsFlag"
                  :editable="markConfig.editable"
                  :scrollStyle="markConfig.scrollStyle"
                  :boxShadow="markConfig.boxShadow"
                  :previewBackground="markConfig.previewBackground"
                  style="margin-bottom: 13px;"
              ></mavon-editor>
            </li>
          </ul>
        </el-dialog>
      </div>
      <footer-case></footer-case>
    </div>
</template>

<script>
    import HeaderCase from "@/components/Header";
    import FooterCase from "@/components/Footerbox";
    import moment from "moment";
    export default {
        name: "Discuss",
      components: {FooterCase, HeaderCase},
      data(){
          return {
            detailDialogShow:false,
            //帖子分类
            types:[
                {
              type:0,
              title:'所有分类'
            },{
              type:1,
              color:'background-color:#409eff',
              title:'综合讨论',
              des:'综合讨论、交流区'
            },{
              type:2,
              color: 'background-color:#9b59b6',
              title:'面经分享',
              des:'用于面试经验的分享'
            },{
              type:3,
              color: 'background-color:#2ecc71',
              title:'笔试分享',
              des:'用于笔试题目或心得分享'
            },{
              type:4,
              color: 'background-color:#f1c40f',
              title: '单位发帖',
              des:'招聘单位发帖讨论'
            }
            ],
            //  选择的帖子类型
            selectedType:0,
            //后端获取的帖子内容
            discussFromServe:[],
            //后端获取回帖信息
            replyFromServe:[],
            //查看详情的帖子
            detail:{},
            //markdown 预览模块配置
            markConfig: {
              subfield: false, // 单双栏模式
              defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
              editable: false,
              toolbarsFlag: false,
              scrollStyle: false,
              boxShadow: false,
              previewBackground: "#ffffff",
            },
            //是否点赞
            isLike:false,
            //回帖信息
            reply:[],
            //新发布的主贴
            newDiscuss:{},
            showNewDiscussDialog:false,
            //新发布的回帖
            newReply:{},
            showNewReply:false,
            //md工具栏选项
            toolbars: {
              imagelink: true, // 图片链接
              code: true, // code
              table: true, // 表格
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              ol: true, // 有序列表
              ul: true, // 无序列表
              undo: true, // 上一步
              redo: true, // 下一步
              trash: true, // 清空
            },
          }
      },
      methods: {
          swagLike(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                  this.isLike = false
                })
                .catch(_ => {});
          },
        //帖子分类
        selectType(){
          if (this.selectedType == 0){
            this.$axios.get('/api/getAllDiscuss').then(res => {
              this.discussFromServe = res.data;
              console.log('disFromServe is :')
              console.log(this.discussFromServe)
            })
          }else {
            this.$axios.post("/api/getByType",{
              type: this.selectedType
            }).then( res =>{
              this.discussFromServe = res.data
              console.log('disFromServe is :')
              console.log(this.discussFromServe)
            })
          }
        },
        //查看帖子详情
        showDetail(index){
          this.detailDialogShow = true
          this.detail = this.discussFromServe[index]
          this.detail.viewer = this.detail.viewer + 1
          this.$axios.post('/api/updateDiscuss',{
            id:this.detail.id,
            likes:this.detail.likes,
            viewer:this.detail.viewer
          })
          // console.log("detail is :")
          // console.log(this.detail)
          this.$axios.post("/api/getReply",{
            discussId: this.detail.id
          }).then(res => {
            console.log('reply is :')
            console.log(res)
            this.reply = res.data
          })
        },
        //点赞
        like(){
          this.isLike = !this.isLike
          this.detail.likes = this.detail.likes + 1
          this.$axios.post('/api/updateDiscuss',{
            id:this.detail.id,
            likes:this.detail.likes,
            viewer:this.detail.viewer
          })
        },
        //取消点赞
        dislike(){
          this.isLike = !this.isLike
          this.detail.likes = this.detail.likes - 1
          this.$axios.post('/api/updateDiscuss',{
            id:this.detail.id,
            likes:this.detail.likes,
            viewer:this.detail.viewer
          })
        },
        //创建主贴
        createDiscuss(){
          this.showNewDiscussDialog = true;

          this.newDiscuss.date = moment().format("MM-DD")
          this.newDiscuss.likes = 0
          this.newDiscuss.status = 1
          this.newDiscuss.userHeader = JSON.parse(this.$store.state.jobseeker).headerSrc
          this.newDiscuss.userName = JSON.parse(this.$store.state.jobseeker).nickname
          this.newDiscuss.userId = JSON.parse(this.$store.state.jobseeker).id
          this.newDiscuss.viewer = 0

        },
        //新发布主贴
        addDiscuss(){
          this.$axios.post("/api/addDiscuss",{
            userId:this.newDiscuss.userId,
            userHeader:this.newDiscuss.userHeader,
            userName:this.newDiscuss.userName,
            title:this.newDiscuss.title,
            content:this.newDiscuss.content,
            likes:this.newDiscuss.likes,
            viewer:this.newDiscuss.viewer,
            date:this.newDiscuss.date,
            type:this.newDiscuss.type,
            status:this.newDiscuss.status
          })
          this.showNewDiscussDialog = false
          this.newDiscuss = {}
          location.reload()
        },
        hiddenDiscuss(){
          this.showNewDiscussDialog = false
          this.newDiscuss = {}
        },
        //创建回帖
        createReply(){
          this.showNewReply = true;

          this.newReply.date = moment().format("MM-DD")
          this.newReply.userHeader = JSON.parse(this.$store.state.jobseeker).headerSrc
          this.newReply.userName = JSON.parse(this.$store.state.jobseeker).nickname
          this.newReply.userId = JSON.parse(this.$store.state.jobseeker).id
          this.newReply.discussId = this.detail.id
        },
        //新增回帖
        addReply(){
          this.$axios.post("/api/addReply",{
            userId:this.newReply.userId,
            userName:this.newReply.userName,
            userHeader:this.newReply.userHeader,
            date:this.newReply.date,
            discussId:this.newReply.discussId,
            content:this.newReply.content
          })
          this.showNewReply = false
          this.newReply = {}
          // console.log('newreply is :')
          // console.log(this.reply)
        },
        hiddenReply(){
          this.showNewReply = false
          this.newReply = {}
        }
      },
      created() {
        //获取全部主贴的内容
        this.$axios.get('/api/getAllDiscuss').then(res => {
          console.log('讨论区内容为:')
          console.log(res)
          this.discussFromServe = res.data;
          // console.log('disFromServe is :')
          // console.log(this.discussFromServe)
        })
      }
    }
</script>

<style scoped>
@import "../css/common.css";
@import "../css/discuss.css";
/deep/ .v-note-wrapper {
  border: none;
  min-height: auto;
  max-height:400px;
}
/deep/ .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  margin: 0;
  padding: 0;
}
/deep/.markdown-body ul {
  padding-left: 1em;
  margin: 0;
}
/deep/ .markdown-body ol {
  padding-left: 1em;
  margin: 0;
}
/deep/ .markdown-body p {
  margin: 0;
  padding: 0;
}
</style>
<style>
.el-dialog{
  height: 400px;
  overflow: auto;
}
.el-dialog__header {
  height: 50px;
  border-bottom: 1px solid #cbcbcb;
}
.el-dialog__title{
  float: left;
  font-size: 20px;
  font-weight: 600;
}
</style>