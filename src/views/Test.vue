<template>
  <div>
    <div class="left" v-if="view">

    </div>
    <div class="right" @click="changeView">

    </div>
  </div>
</template>

<script>
    export default {
        name: "Test",
        data() {
            return {
                view:false
            };
        },
        methods: {
          changeView(){
            this.view = !this.view
          }
        },

    }
</script>

<style scoped>
*{
  padding:0;
  margin: 0;
}
.left{
  display: inline-block;
  width: 600px;
  height: 300px;
  margin-right: 100px;
  background-color: red;
}
.right {
  display: inline-block;
  width: 600px;
  height: 300px;
  margin: 0 auto;
  background-color: #9bceea;
}
</style>