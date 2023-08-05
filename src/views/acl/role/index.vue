<template>
  <el-card class="card">
    <el-form inline class="form">
      <el-form-item label="职位搜索">
        <el-input placeholder="请输入职位" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!keyword" @click="search">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="plus" @click="addRole">添加角色</el-button>
    <el-table border style="margin: 10px 0" :data="allRole">
      <el-table-column label="#" align="center" type="index" width="150px"></el-table-column>
      <el-table-column label="id" align="center" width="250px" prop="id"></el-table-column>
      <el-table-column
        label="职位名称"
        align="center"
        width="250px"
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        width="250px"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        width="250px"
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row, index }">
          <el-button type="primary" icon="user" @click="setPermissions(row)">分配权限</el-button>
          <el-button type="warning" icon="edit" @click="editRole(row)">编辑</el-button>
          <el-button type="danger" icon="delete">删除</el-button>
        </template>
      </el-table-column>
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
  <!-- 添加职位与编辑职位的对话框 -->
  <el-dialog v-model="dialogFormVisible" :title="roleParams.id ? '更新职位' : '添加职位'">
    <el-form :model="roleParams" :rules="rules" ref="form">
      <el-form-item label="职位名称" prop="roleName">
        <el-input placeholder="请输入职位名称" v-model="roleParams.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="save">确定</el-button>
    </template>
  </el-dialog>
  <!-- 分配权限的抽屉 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <!-- 树形控件 -->
      <el-tree
        ref="tree"
        :data="menuArr"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="selectArr"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="handler">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, reactive, nextTick } from 'vue'
import {
  reqAllRoleList,
  reqAddOrUpdateRole,
  reqAllMenuList,
  reqSetPermission,
} from '@/api/acl/role'
import {
  RoleResponseData,
  Records,
  RoleData,
  MenuList,
  MenuResponseData,
  MenuData,
} from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
import { ElMessage } from 'element-plus'
// 引入骨架仓库
let settingStore = useLayoutSettingStore()
// 分页器当前页码
let pageNo = ref<number>(1)

// 每页展示几条数据
let pageSize = ref<number>(10)

// 一共多少条数据
let total = ref<number>(0)

// 搜索职位的关键字
let keyword = ref<string>('')

// 存储全部职位
let allRole = ref<Records>([])

// 对话框的显示与隐藏
let dialogFormVisible = ref<boolean>(false)

// 收集表单的职位数据
let roleParams = reactive<RoleData>({
  roleName: '',
})

// 表单组件实例
let form = ref<any>()

// 控制抽屉的显示与隐藏
let drawer = ref<boolean>(false)

// 定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])

//准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([])

// 树形控件数据
const defaultProps = {
  children: 'children',
  label: 'name',
}

// 树形组件实例
let tree = ref<any>()

// 页面挂载后获取角色
onMounted(() => {
  getHasRole()
})

// pageNo 已被双向绑定所以这里监听 pageNo 变化发请求即可 pageSize 同理
watch([pageNo, pageSize], () => {
  getHasRole(pageNo.value)
})

// 获取角色
const getHasRole = async (pager = 1) => {
  // 修改当前页面
  pageNo.value = pager
  let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    // 存储全部职位
    allRole.value = result.data.records
    // 存储职位总个数
    total.value = result.data.total
  } else {
    ElMessage({
      type: 'error',
      message: '获取角色失败',
    })
  }
}

// 搜索按钮
const search = () => {
  // 根据关键字重新发请求
  getHasRole()
  // 清空关键字
  keyword.value = ''
}

// 重置按钮
const reset = () => {
  settingStore.refresh = !settingStore.refresh
}

// 添加角色按钮
const addRole = () => {
  // 显示对话框
  dialogFormVisible.value = true
  // 清空上次的数据
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  })
  // 清除校验规则警告
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

// 编辑角色按钮
const editRole = (row: RoleData) => {
  dialogFormVisible.value = true
  Object.assign(roleParams, row)
  // 清除校验规则警告
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}

// 针对职位名称的校验规则
const validatorRoleName = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('职位名称不得少于两个字符'))
  }
}

// 表单的校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}

// 表单的确定按钮
const save = async () => {
  await form.value.validate()
  let result: any = await reqAddOrUpdateRole(roleParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: roleParams.id ? '更新成功' : '添加成功',
    })
    // 关闭对话框
    dialogFormVisible.value = false
    // 重新获取角色
    getHasRole(roleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.id ? '更新失败' : '添加失败',
    })
  }
}

// 分配权限按钮
const setPermissions = async (row: RoleData) => {
  // 清空上次的数据
  Object.assign(roleParams, {
    roleName: '',
    id: 0,
  })
  // 打开抽屉
  drawer.value = true
  //收集当前要分类权限的职位的数据
  Object.assign(roleParams, row)
  let result: MenuResponseData = await reqAllMenuList(roleParams.id as number)
  if (result.code === 200) {
    menuArr.value = result.data
    selectArr.value = filterSelectArr(menuArr.value, [])
  }
}

const filterSelectArr = (allData: MenuList, initArr: number[]) => {
  // 获取等级为4且被选中的菜单
  allData.forEach((item: MenuData) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    // 递归处理子项
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}
// 权限抽屉确定按钮
const handler = async () => {
  // 获取当前职位的id
  let roleId = roleParams.id as number
  // 获取选中节点的id
  let arr = tree.value.getCheckedKeys()
  // 获取半选中节点的id
  let arr1 = tree.value.getHalfCheckedKeys()
  // 拼接两个数组
  let permissionId = arr.concat(arr1)
  // 发请求
  let result: any = await reqSetPermission(roleId, permissionId)
  if (result.code === 200) {
    // 关闭抽屉
    drawer.value = false
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    // 刷新页面
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    })
  }
}
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
