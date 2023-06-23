<template>
  <el-card>
    <el-table :data="skuArr" border style="margin: 10px 0">
      <el-table-column label="序号" type="index" align="center" width="120px"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="280px"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        label="描述"
        show-overflow-tooltip
        width="280px"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="图片" width="280px">
        <template #="{ row }">
          <img :src="row.skuDefaultImg" alt="图片缺失" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量（克）" width="280px" prop="weight"></el-table-column>
      <el-table-column label="价格（元）" width="280px" prop="price"></el-table-column>
      <el-table-column label="操作" width="280px" fixed="right">
        <template #="{ row }">
          <el-button type="success" size="small" icon="Top"></el-button>
          <el-button type="primary" size="small" icon="edit"></el-button>
          <el-button type="info" size="small" icon="InfoFilled"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, total, sizes"
      :total="total"
    />
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { reqSkuList } from '@/api/product/sku'
import { SkuResponseData, SkuData } from '@/api/product/sku/type'
// 分页器当前页码
let pageNo = ref<number>(1)

// 每页展示几条数据
let pageSize = ref<number>(10)

// 一共多少条数据
let total = ref<number>(0)

// sku列表数组
let skuArr = ref<SkuData[]>([])

onMounted(() => {
  getHasSku()
})

const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code === 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}

// pageNo 已被双向绑定所以这里监听 pageNo 变化发请求即可 limit 同理
watch([pageNo, pageSize], () => {
  getHasSku(pageNo.value)
})
</script>

<style lang="less" scoped></style>
