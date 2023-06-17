<template>
  <div>
    <Category />
    <el-card style="margin: 10px 0">
      <el-button type="primary" icon="plus" :disabled="!categoryStore.c3Id">添加平台属性</el-button>
      <el-table border style="margin: 10px 0" :data="attrArr">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性名称" width="150px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #="{ row }">
            <el-tag
              style="margin: 5px"
              type="primary"
              v-for="item in row.attrValueList"
              :key="row.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template #="{ row }">
            <el-button type="warning" size="small" icon="edit"></el-button>
            <el-button type="danger" size="small" icon="delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { reqAttr } from '@/api/product/attr/index'
import useCategoryStore from '@/store/modules/category'
import { AttrResponseData, Attr } from '@/api/product/attr/type'
let categoryStore = useCategoryStore()
// 存储已有属性与属性值
let attrArr = ref<Attr[]>([])

// 监听三级分类id
watch(
  () => categoryStore.c3Id,
  () => {
    // 清空上次的返回结果
    attrArr.value = []
    // 三级id不存在的时候不发送请求
    if (!categoryStore.c3Id) return
    getAttr()
  },
)

// 获取已有属性值的方法
const getAttr = async () => {
  const { c1Id, c2Id, c3Id } = categoryStore
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, c3Id)
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
</script>

<style lang="less" scoped></style>
