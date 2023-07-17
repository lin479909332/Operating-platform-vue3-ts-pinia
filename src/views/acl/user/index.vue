<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="!keyword" @click="search">搜索</el-button>
        <el-button type="primary" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary" @click="addUser">添加</el-button>
    <el-button type="danger" :disabled="!selectArrId.length" @click="deleteSelectUser">
      批量删除
    </el-button>
    <el-table border style="margin: 10px 0" :data="userArr" @selection-change="selectChange">
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column label="序号" align="center" type="index" width="150px"></el-table-column>
      <el-table-column label="id" align="center" width="150px" prop="id"></el-table-column>
      <el-table-column
        label="用户名"
        align="center"
        width="150px"
        prop="username"
      ></el-table-column>
      <el-table-column label="用户名称" align="center" width="150px" prop="name"></el-table-column>
      <el-table-column
        label="用户角色"
        align="center"
        width="200px"
        show-overflow-tooltip
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        width="200px"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        width="200px"
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template #="{ row }">
          <el-button type="primary" icon="user" size="small" @click="setRole(row)">
            分配职位
          </el-button>
          <el-button type="warning" icon="edit" size="small" @click="updateUser(row)">
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.username}吗？`"
            width="260px"
            @confirm="deleteUser(row.id)"
          >
            <template #reference>
              <el-button type="danger" icon="delete" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      :page-sizes="[3, 5, 7, 9]"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
    />
  </el-card>
  <!-- 抽屉 添加|修改用户 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userParams.id ? '编辑用户' : '添加用户' }}</h4>
    </template>
    <template #default>
      <el-form label-width="80px" :model="userParams" :rules="rules" ref="formRef">
        <el-form-item label="用户名" prop="username">
          <el-input placeholder="请输入用户名" v-model="userParams.username"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
          <el-input placeholder="请输入密码" v-model="userParams.password"></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉 分配角色 -->
  <el-drawer v-model="drawer1">
    <template #header>
      <h4>分配职位</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="userParams.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="分配职位">
          <el-checkbox @change="handleCheckAllChange" :indeterminate="isIndeterminate">
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="userRole"
            @change="handleCheckedCitiesChange"
            style="display: flex; flex-wrap: wrap"
          >
            <el-checkbox v-for="role in allRole" :key="role.id" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer1 = false">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, reactive, nextTick } from 'vue'
import {
  reqUserInfo,
  reqAddOrUpdateUser,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqSelectUser,
} from '@/api/acl/user'
import {
  UserResponseDate,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
import useLayoutSettingStore from '@/store/modules/setting'

// 创建设置相关的仓库
let layoutSettingStore = useLayoutSettingStore()

// 分页器当前页码
let pageNo = ref<number>(1)

// 每页展示几条数据
let pageSize = ref<number>(5)

// 一共多少条数据
let total = ref<number>(0)

// 存储全部用户的数组
let userArr = ref<Records>([])

// 控制用户抽屉的显示与隐藏
let drawer = ref<boolean>(false)

// form表单实例
let formRef = ref<any>()

// 控制分配角色抽屉的显示与隐藏
let drawer1 = ref<boolean>(false)

// 存储所有的职位
let allRole = ref<AllRole>([])

// 存储用户所拥有的职位
let userRole = ref<AllRole>([])

//收集顶部复选框全选数据
const checkAll = ref<boolean>(false)

// 控制顶部全选复选框不确定的样式
const isIndeterminate = ref<boolean>(true)

// 存储批量删除用户的id数组
let selectArrId = ref<User[]>([])

// 搜索用户的关键字
let keyword = ref<string>('')

// 存储添加|修改用户需要的数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})

// 加载后先获取一次
onMounted(() => {
  getHasUser()
})

// 获取全部用户信息(包含搜索用户)
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseDate = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

// pageNo 已被双向绑定所以这里监听 pageNo 变化发请求即可 pageSize 同理
watch([pageNo, pageSize], () => {
  getHasUser(pageNo.value)
})

// 添加用户按钮
const addUser = () => {
  // 打开抽屉
  drawer.value = true
  // 清空数据
  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  // 清除上一次的校验规则警告（也会清空掉表单数据）
  nextTick(() => {
    formRef.value.resetFields()
  })
}

// 编辑用户按钮
const updateUser = (row: User) => {
  // 打开抽屉
  drawer.value = true
  // 把当前行的用户信息赋值给userParams
  Object.assign(userParams, row)
  // 清除上一次的校验规则警告（也会清空掉表单数据）
  nextTick(() => {
    formRef.value.resetFields()
  })
}

// 用户抽屉取消按钮
const cancel = () => {
  drawer.value = false
}

// 用户抽屉确认按钮
const save = async () => {
  await formRef.value.validate()
  // 打开抽屉
  drawer.value = true
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改用户成功' : '添加用户成功',
    })
    // 关闭抽屉
    drawer.value = false
    // 重新获取一次数据
    // getHasUser(userParams.id ? pageNo.value : 1)
    // 如果用户修改了当前登录的账号 重新刷新一次页面
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改用户失败' : '添加用户失败',
    })
    // 关闭抽屉
    drawer.value = false
  }
}

// 针对用户名的校验规则
const validatorUsername = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户名不得少于5位'))
  }
}

// 针对用户昵称的校验规则
const validatorName = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack()
  } else {
    callBack(new Error('用户昵称不得少于5位'))
  }
}

// 针对密码的校验规则
const validatorPassword = (_rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 6) {
    callBack()
  } else {
    callBack(new Error('密码不得少于6位'))
  }
}

// 表单校验规则对象
const rules = {
  // 用户名
  username: [{ required: true, trigger: 'change', validator: validatorUsername }],
  // 用户昵称
  name: [{ required: true, trigger: 'change', validator: validatorName }],
  // 密码
  password: [{ required: true, trigger: 'change', validator: validatorPassword }],
}

// 分配职位按钮
const setRole = async (row: User) => {
  // 获取当前row赋值给userParams
  Object.assign(userParams, row)
  let result: AllRoleResponseData = await reqAllRole(userParams.id as number)
  if (result.code === 200) {
    // 存储所有的职位
    allRole.value = result.data.allRolesList
    // 存储用户所拥有的职位
    userRole.value = result.data.assignRoles
    // 打开分配职位抽屉
    drawer1.value = true
  }
}

// 顶部的全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  // val:true(全选)|false(没有全选)
  userRole.value = val ? allRole.value : []
  // 不确定的样式(确定样式)
  isIndeterminate.value = false
}

// 顶部全部的复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  // 顶部复选框的勾选数据
  const checkedCount = value.length
  // 代表:勾选上的项目个数与全部的职位个数相等，顶部的复选框勾选上
  checkAll.value = value.length === allRole.value.length
  // 不确定的样式
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

// 分配职位的确定按钮
const confirmClick = async () => {
  // 收集参数
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => item.id as number),
  }
  // 发请求
  let result = await reqSetUserRole(data)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '分配职位成功',
    })
    // 关闭抽屉
    drawer1.value = false
    // 重新获取一次用户信息（在当前页）
    getHasUser(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '分配职位失败',
    })
  }
}

// 确定删除用户
const deleteUser = async (id: number) => {
  let result = await reqRemoveUser(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

// 表格复选框变化后的回调
const selectChange = (value: any) => {
  selectArrId.value = value
}

// 批量删除用户的回调
const deleteSelectUser = async () => {
  let idList: any = selectArrId.value.map((item) => {
    return item.id
  })
  let result: any = await reqSelectUser(idList)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}

// 搜索用户的回调
const search = () => {
  // 获取用户
  getHasUser()
  // 清空输入的用户名
  keyword.value = ''
}

// 重置按钮的回调
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
