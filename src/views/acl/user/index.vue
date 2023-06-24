<template>
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名：">
        <el-input placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button type="primary" plain>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0">
    <el-button type="primary">添加</el-button>
    <el-button type="danger">批量删除</el-button>
    <el-table border style="margin: 10px 0" :data="userArr">
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
          <el-button type="primary" icon="user" size="small">分配角色</el-button>
          <el-button type="warning" icon="edit" size="small">编辑</el-button>
          <el-button type="danger" icon="delete" size="small">删除</el-button>
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
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { reqUserInfo } from '@/api/acl/user'
import { UserResponseDate, Records } from '@/api/acl/user/type'
// 分页器当前页码
let pageNo = ref<number>(1)

// 每页展示几条数据
let pageSize = ref<number>(5)

// 一共多少条数据
let total = ref<number>(0)

// 存储全部用户的数组
let userArr = ref<Records>([])

// 加载后先获取一次
onMounted(() => {
  getHasUser()
})

// 获取全部用户信息
const getHasUser = async (pager = 1) => {
  pageNo.value = pager
  let result: UserResponseDate = await reqUserInfo(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}

// pageNo 已被双向绑定所以这里监听 pageNo 变化发请求即可 pageSize 同理
watch([pageNo, pageSize], () => {
  getHasUser(pageNo.value)
})
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
