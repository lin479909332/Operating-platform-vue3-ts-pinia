<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 获取节点
let charts = ref()
// 组件挂载完毕
onMounted(() => {
  let myChart = echarts.init(charts.value)
  //设置配置项
  let option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 30,
      top: 60,
      orient: 'vertical', //图例组件方向的设置
      textStyle: {
        color: 'white',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },

        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: '90后' },
          { value: 735, name: '00后' },
          { value: 580, name: '80后' },
          { value: 484, name: '70后' },
          { value: 300, name: '60后' },
        ],
      },
    ],
    //调整图形图标的位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  }
  myChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.box2 {
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 20px;
    p {
      color: #fff;
      font-size: 20px;
    }
  }
  .charts {
    height: 260px;
  }
}
</style>
