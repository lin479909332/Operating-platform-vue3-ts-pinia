<template>
  <el-table :data="permissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column label="名称" prop="name" />
    <el-table-column label="权限值" prop="code" />
    <el-table-column label="修改时间" prop="updateTime" />
    <el-table-column label="操作">
      <template #="{ row, index }">
        <el-button type="primary" icon="plus" :disabled="row.level === 4" @click="addPermission">
          {{ row.level === 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="warning"
          icon="edit"
          :disabled="row.level === 1"
          @click="updatePermission(row)"
        >
          编辑
        </el-button>
        <el-button type="danger" icon="delete" :disabled="row.level === 1">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加与更新菜单的对话框 -->
  <el-dialog v-model="dialogVisible" title="添加菜单" width="30%">
    <el-form label-width="80px">
      <el-form-item label="菜单名称">
        <el-input placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input placeholder="请输入菜单权限值"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { reqGetAllPermission } from '@/api/acl/menu'
import type { PermissionList, PermissionResponseData, Permission } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
// 存储菜单的数据
const permissionArr = ref<PermissionList>([])
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
// 组件挂载完毕
onMounted(() => {
  getHasPermission()
})
// 获取菜单数据的方法
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqGetAllPermission()
  if (result.code === 200) {
    permissionArr.value = result.data
  } else {
    ElMessage({
      type: 'error',
      message: '获取菜单数据失败',
    })
  }
}
// 添加菜单/功能的按钮
const addPermission = () => {
  dialogVisible.value = true
}
// 编辑按钮
const updatePermission = (row: Permission) => {
  dialogVisible.value = true
  console.log(row)
}
</script>

<style lang="less" scoped></style>
