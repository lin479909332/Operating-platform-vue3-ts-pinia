<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行榜</p>
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
  // 获取echarts实例
  let myCharts = echarts.init(charts.value)
  myCharts.setOption({
    //标题组件
    title: {
      //主标题
      text: '景区排行',
      link: 'http://www.baidu.com',
      //标题的位置
      left: '50%',
      //主标题文字样式
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20,
      },
      //子标题
      subtext: '各大景区排行',
      //子标题的样式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 16,
      },
    },
    //x|y轴组件
    xAxis: {
      type: 'category', //图形图标在x轴均匀分布展示
    },
    yAxis: {},
    //布局组件
    grid: {
      left: 20,
      bottom: 20,
      right: 20,
    },
    //系列:决定显示图形图标是哪一种的
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        //柱状图的:图形上的文本标签，
        label: {
          show: true,
          //文字的位置
          position: 'insideTop',
          //文字颜色
          color: 'red',
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          //底部背景的颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            global: false, // 缺省为 false
          },
        },
        //柱条的样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          //柱条颜色
          color: function (data: any) {
            //给每一个柱条这是背景颜色
            let arr = ['cyan', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue']
            return arr[data.dataIndex]
          },
        },
      },
      {
        type: 'line',
        data: [10, 20, 30, 40, 50, 60, 90],
        smooth: true, //平滑曲线
      },
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 70],
        //柱状图的:图形上的文本标签，
        label: {
          show: true,
          //文字的位置
          position: 'insideTop',
          //文字颜色
          color: 'red',
        },
        //是否显示背景颜色
        showBackground: true,
        backgroundStyle: {
          //底部背景的颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            global: false, // 缺省为 false
          },
        },
        //柱条的样式
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          //柱条颜色
          color: function (data: any) {
            //给每一个柱条这是背景颜色
            let arr = ['cyan', 'orange', 'yellowgreen', 'green', 'purple', 'hotpink', 'skyblue']
            return arr[data.dataIndex]
          },
        },
      },
    ],
    tooltip: {
      backgroundColor: 'rgba(50,50,50,0.7)',
    },
  })
})
</script>

<style lang="scss" scoped>
.box6 {
  margin-top: 10px;
  width: 100%;
  height: 100%;
  background: url('../../images/dataScreen-main-rt.png') no-repeat;
  background-size: 100% 100%;
  .title {
    margin-left: 10px;
    p {
      color: #fff;
      font-size: 20px;
    }
  }
  .charts {
    height: calc(100% - 30px);
  }
}
</style>
