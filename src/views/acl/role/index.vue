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
    <el-button type="primary" icon="plus">添加角色</el-button>
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
          <el-button type="primary" icon="user">分配权限</el-button>
          <el-button type="warning" icon="edit">编辑</el-button>
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { reqAllRoleList } from '@/api/acl/role'
import { RoleResponseData, Records } from '@/api/acl/role/type'
import useLayoutSettingStore from '@/store/modules/setting'
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
