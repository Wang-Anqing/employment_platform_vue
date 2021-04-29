<template>
    <div class="recom w">
        <h3>感兴趣的职位</h3>
        <ul>
            <li v-for="item in jobkind"><span>|</span>
                <a style="cursor: pointer" @click="setTag(item)">
                    {{item}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Recomm",
        data() {
            return {
                checked: false,
                jobkind: [
                    'WEB',
                    'Java',
                    'Android',
                    'IOS',
                    '测试',
                    'UI设计',
                    '算法',
                    '嵌入式',
                    '通信'
                ]
            }
        },
        methods: {
          setTag(tag){
            this.$emit('transferTag',tag)
          }
        }
    }
</script>

<style scoped>
.recom {
  margin-top: 8px;
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
}

.recom h3 {
  float: left;
  margin-left: 30px;
  font-size: 16px;
  font-weight: 700;
  color: #00a4ff;
}

.recom ul {
  float: left;
  margin-left: 20px;
}

.recom ul li {
  float: left;
  height: 60px;
}

.recom ul li span {
  float: left;
  margin-left: 20px;
  color: #bfbfbf;
}

.recom ul li a {
  display: inline-block;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  margin-left: 20px;
  font-size: 16px;
  border: 1px solid #409eff;
  color: #409eff;
}
</style>