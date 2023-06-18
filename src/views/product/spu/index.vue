<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <el-button type="primary" icon="plus" :disabled="!categoryStore.c3Id">添加SPU</el-button>
    <el-table border style="margin: 10px 0" :data="records">
      <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
      <el-table-column label="SPU名称" prop="spuName"></el-table-column>
      <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
      <el-table-column label="SPU操作">
        <template #="{ row }">
          <el-button size="small" type="primary" icon="plus" title="添加SKU"></el-button>
          <el-button size="small" type="warning" icon="edit" title="修改SKU"></el-button>
          <el-button size="small" type="info" icon="view" title="查看SKU列表"></el-button>
          <el-button size="small" type="danger" icon="delete" title="删除SPU"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { reqGetSpu } from '@/api/product/spu'
import { HasSpuResponseData, Records } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

// 控制场景的可用状态，0可用 1不可用
let scene = ref<number>(0)

// 分页器默认的页码
let pageNo = ref<number>(1)

// 一页展示几条数据
let pageSize = ref<number>(3)

// 存储SPU数据的数组
let records = ref<Records>([])

// SPU数据总数
let total = ref<number>(0)

// 监听仓库的三级分类id发生变化
watch(
  () => categoryStore.c3Id,
  () => {
    // 确保有三级分类id再发送请求
    if (!categoryStore.c3Id) return
    getHasSpu()
  },
)

// pageNo 已被双向绑定所以这里监听 pageNo 变化发请求即可 pageSize 同理
watch([pageNo, pageSize], () => {
  getHasSpu(pageNo.value)
})

// 获取SPU数据的方法
const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  let result: HasSpuResponseData = await reqGetSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (result.code === 200) {
    // 存储SPU数据
    records.value = result.data.records
    // 存储总数
    total.value = result.data.total
  }
}
</script>

<style lang="less" scoped></style>
