<template>
  <el-card class="card">
    <el-form inline class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入职位"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="plus">添加角色</el-button>
    <el-table border style="margin: 10px 0">
      <el-table-column label="#" align="center" type="index" width="150px"></el-table-column>
      <el-table-column label="id" align="center" width="250px"></el-table-column>
      <el-table-column label="职位名称" align="center" width="250px"></el-table-column>
      <el-table-column label="创建时间" align="center" width="250px"></el-table-column>
      <el-table-column label="更新时间" align="center" width="250px"></el-table-column>
      <el-table-column label="操作" align="center"></el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      :page-sizes="[10, 20, 30, 40]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 分页器当前页码
let pageNo = ref<number>(1)

// 每页展示几条数据
let pageSize = ref<number>(10)

// 一共多少条数据
let total = ref<number>(0)
</script>

<style scoped>
.card {
  height: 80px;
}
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
