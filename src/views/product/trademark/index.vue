<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格组件 -->
    <el-table border style="margin: 10px 0" :data="trademarkArr">
      <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
      <el-table-column label="品牌名称" prop="tmName"></el-table-column>
      <el-table-column label="品牌LOGO">
        <template #="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row }">
          <el-button type="warning" size="small" icon="edit"></el-button>
          <el-button type="danger" size="small" icon="delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
        pagination
          v-model:current-page:设置分页器当前页码
          v-model:page-size:设置每一个展示数据条数
          page-sizes:用于设置下拉菜单数据
          background:设置分页器按钮的背景颜色
          layout:可以设置分页器六个子组件布局调整
     -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/index'
// 当前页面
let pageNo = ref<number>(1)
// 每页展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkArr = ref<any>([])
// 获取已有品牌的接口 这个接口需要多次调用，这里封装成函数
const getHasTrademark = async () => {
  let result = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    // 存储数据
    total.value = result.data.total
    trademarkArr.value = result.data.records
    // 接口返回的图片出错了 自己处理了一下
    if (result.data.records[0].id === 1) {
      trademarkArr.value[0].logoUrl =
        'http://39.98.123.211/group1/M00/03/D9/rBHu8mHmKC6AQ-j2AAAb72A3EO0942.jpg'
    }
  }
}
// 组件加载完毕时调用获取品牌的接口
onMounted(() => {
  getHasTrademark()
})
</script>

<style lang="less" scoped></style>
