<template>
<div class="box">
  <p><span>卦象：</span>{{this.guaXiang}}</p>
  <p><span>所占之事：</span>{{this.wenTi}}</p>
  <p><span>起卦时间：</span>{{this.createTime}}</p>
  <p><span>排盘：</span><img :src="this.paiPan" style="width: 80%;"></p>
  <p><span>结果：</span>{{this.duanGua}}</p>
  <p><span>备注：</span>{{this.beiZhu}}</p>
</div>
</template>

<script>
export default {
  name: "XiangQing",
  data() {
    return{
      wenTi: "",
      createTime: "",
      guaXiang: "",
      paiPan: "",
      duanGua: "",
      beiZhu: ""
    }
  },
  created() {
    this.xq = this.$route.query.o
    console.log(this.xq)
  }
}
</script>

<style scoped>
.box {
  max-width: 800px;
  margin: 0 auto;

}
p{
  text-align: left;
  margin-bottom: 50px;
  font-size: 25px;
}
span{
  font-weight: bold;
  max-width: 130px;
  text-align-last: justify;


}
</style>