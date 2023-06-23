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
          <el-button
            size="small"
            :type="row.isSale === 1 ? 'warning' : 'success'"
            :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="edit" @click="updateSku"></el-button>
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
import { reqSkuList, reqSaleSku, reqCancelSale } from '@/api/product/sku'
import { SkuResponseData, SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
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

// 获取sku列表的方法
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

// 更新sku上下架状态
const updateSale = async (row: SkuData) => {
  // 如果当前sku的isSale===1,说明当前sku是上架的状态->更新为下架
  // 否则else情况与上面情况相反
  if (row.isSale === 1) {
    // 下架操作
    await reqCancelSale(row.id as number)
    // 提示信息
    ElMessage({ type: 'success', message: '下架成功' })
    // 发请求获取当前更新完毕的全部已有的SKU
    getHasSku(pageNo.value)
  } else {
    // 上架操作
    await reqSaleSku(row.id as number)
    // 提示信息
    ElMessage({ type: 'success', message: '上架成功' })
    // 发请求获取当前更新完毕的全部已有的SKU
    getHasSku(pageNo.value)
  }
}

// 编辑sku按钮（开发中）
const updateSku = () => {
  ElMessage({
    type: 'info',
    message: '正在开发中，敬请期待......',
  })
}
</script>

<style lang="less" scoped></style>
