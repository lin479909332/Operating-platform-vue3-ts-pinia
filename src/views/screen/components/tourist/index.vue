<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>999999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- echarts -->
    <div class="charts">

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
let people = ref<string>('215908人')
</script>

<style lang="scss" scoped>
.box {
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .top {
    margin-left: 20px;
    .title {
      color: #fff;
      font-size: 20px;
    }
    .bg {
      width: 68px;
      height: 7px;
      background: url('../../images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right {
      float: right;
      color: #fff;
      font-size: 20px;
      span {
        color: gold;
        font-style: italic;
      }
    }
  }
  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;
    span {
      flex: 1;
      font-size: 20px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url('../../images/total.png') no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }
  .charts{
    width: 100%;
    height: 250px;
    background-color: aliceblue;
  }
}
</style>
