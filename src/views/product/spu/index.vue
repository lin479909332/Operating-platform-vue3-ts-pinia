<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="plus">添加SPU</el-button>
    <el-table border style="margin: 10px 0">
      <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
      <el-table-column label="SPU名称"></el-table-column>
      <el-table-column label="SPU描述"></el-table-column>
      <el-table-column label="SPU操作"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="400"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 控制场景的可用状态，0可用 1不可用
let scene = ref<number>(0)

// 分页器默认的页码
let pageNo = ref<number>(1)

// 一页展示几条数据
let pageSize = ref<number>(3)
</script>

<style lang="less" scoped></style>
