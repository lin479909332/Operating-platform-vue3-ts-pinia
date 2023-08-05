<template>
  <el-table :data="permissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column label="名称" prop="name" />
    <el-table-column label="权限值" prop="code" />
    <el-table-column label="修改时间" prop="updateTime" />
    <el-table-column label="操作">
      <template #="{ row, index }">
        <el-button
          type="primary"
          icon="plus"
          :disabled="row.level === 4"
          @click="addPermission(row)"
        >
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
  <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'" width="30%">
    <el-form label-width="80px">
      <el-form-item label="菜单名称">
        <el-input placeholder="请输入菜单名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input placeholder="请输入菜单权限值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { reqGetAllPermission, reqAddOrUpdateMenu } from '@/api/acl/menu'
import type {
  PermissionList,
  PermissionResponseData,
  Permission,
  MenuParams,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
// 存储菜单的数据
const permissionArr = ref<PermissionList>([])
// 控制对话框的显示与隐藏
let dialogVisible = ref<boolean>(false)
//
let menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0,
})
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
const addPermission = (row: Permission) => {
  // 清空数据
  Object.assign(menuData, {
    id: null,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  // 打开对话框
  dialogVisible.value = true
  // 收集添加菜单需要的level为当前菜单的下一级
  menuData.level = row.level + 1
  // 收集菜单id（给哪个菜单添加）
  menuData.pid = row.id as number
}
// 编辑按钮
const updatePermission = async (row: Permission) => {
  // 清空数据
  Object.assign(menuData, {
    id: null,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  // 显示对话框
  dialogVisible.value = true
  // 处理参数
  Object.assign(menuData, row)
}
// 对话框确定按钮的回调
const save = async () => {
  let result: any = await reqAddOrUpdateMenu(menuData)
  if (result.code === 200) {
    // 隐藏对话框
    dialogVisible.value = false
    ElMessage({
      type: 'success',
      message: menuData.id ? '更新成功' : '添加成功',
    })
    // 重新获取一次菜单
    getHasPermission()
  } else {
    ElMessage({
      type: 'error',
      message: menuData.id ? '更新失败' : '添加失败',
    })
  }
}
</script>

<style lang="less" scoped></style>
