<template>
  <div class="box4" ref="map">地图</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
// 引入中国地图json数据
import chinaJSON from './china.json'
// 获取节点
let map = ref()
// 注册中国地图
echarts.registerMap('china', chinaJSON as any)
// 组件挂载完毕
onMounted(() => {
  let myCharts = echarts.init(map.value)
  myCharts.setOption({
    //地图组件
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放的效果
      //地图的位置调试
      left: 150,
      top: 150,
      right: 150,
      zoom: 1.2,
      bottom: 0,
      //地图上的文字的设置
      label: {
        show: true, //文字显示出来
        color: 'white',
        fontSize: 14,
      },

      itemStyle: {
        //每一个多边形的样式
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#294a8b', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#1494e8', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8,
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: '##dbeff7',
        },
        label: {
          fontSize: 40,
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
            },
          },
          {
            coords: [
              [113.280637, 23.125178], // 起点
              [121.472644, 31.231706], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
            },
          },
          {
            coords: [
              [91.132212, 29.660361], // 起点
              [87.617733, 43.792818], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
            },
          },
          {
            coords: [
              [102.712251, 25.040609], // 起点
              [111.670801, 40.818311], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
            },
          },
          {
            coords: [
              [101.778916, 36.623178], // 起点
              [104.065735, 30.659462], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
            },
          },
          {
            coords: [
              [112.549248, 37.857014], // 起点
              [108.320004, 22.82402], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'white',
              width: 2,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'hotpink',
          symbolSize: 10,
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped></style>
