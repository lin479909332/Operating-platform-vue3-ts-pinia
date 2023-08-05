<template>
  <el-table :data="permissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column label="名称" prop="name" />
    <el-table-column label="权限值" prop="code" />
    <el-table-column label="修改时间" prop="updateTime" />
    <el-table-column label="操作">
      <template #="{ row, index }">
        <el-button type="primary" icon="plus" :disabled="row.level === 4">
          {{ row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button type="warning" icon="edit" :disabled="row.level === 1">编辑</el-button>
        <el-button type="danger" icon="delete" :disabled="row.level === 1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqGetAllPermission } from '@/api/acl/menu'
import type { PermissionList, PermissionResponseData } from '@/api/acl/menu/type'
// 存储菜单的数据
const permissionArr = ref<PermissionList>([])
// 组件挂载完毕
onMounted(() => {
  getHasPermission()
})
// 获取菜单数据的方法
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqGetAllPermission()
  if (result.code === 200) {
    permissionArr.value = result.data
  }
}
</script>

<style lang="less" scoped></style>
