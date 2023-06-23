<template>
  <el-card>
    <el-table border style="margin: 10px 0">
      <el-table-column label="序号" type="index" align="center" width="120px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip width="280px"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip width="280px"></el-table-column>
      <el-table-column label="图片" width="280px"></el-table-column>
      <el-table-column label="重量（克）" width="280px"></el-table-column>
      <el-table-column label="价格（元）" width="280px"></el-table-column>
      <el-table-column label="操作" width="280px" fixed="right"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="400"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 分页器当前页码
let pageNo = ref<number>(1)

// 每页展示几条数据
let pageSize = ref<number>(10)
</script>

<style lang="less" scoped></style>
