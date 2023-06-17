<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="plus" :disabled="!categoryStore.c3Id">添加平台属性</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="序号" width="120px"></el-table-column>
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="序号" width="120px"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import {} from 'vue'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
</script>

<style lang="less" scoped></style>
