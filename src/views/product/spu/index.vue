<template>
  <Category :scene="scene" />
  <el-card style="margin: 10px 0">
    <div v-show="scene === 0">
      <el-button @click="addSpu" type="primary" icon="plus" :disabled="!categoryStore.c3Id">
        添加SPU
      </el-button>
      <el-table border style="margin: 10px 0" :data="records">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row }">
            <el-button
              size="small"
              type="primary"
              icon="plus"
              title="添加SKU"
              @click="addSku(row)"
            ></el-button>
            <el-button
              @click="updateSpu(row)"
              size="small"
              type="warning"
              icon="edit"
              title="修改SPU"
            ></el-button>
            <el-button
              size="small"
              type="info"
              icon="view"
              title="查看SKU列表"
              @click="showSku(row)"
            ></el-button>
            <el-popconfirm
              :title="`你确认要删除${row.spuName}吗？`"
              width="200px"
              @confirm="deleteSpu(row)"
            >
              <template #reference>
                <el-button size="small" type="danger" icon="delete" title="删除SPU"></el-button>
              </template>
            </el-popconfirm>
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
    </div>
    <!-- 添加|修改Spu子组件 -->
    <SpuForm ref="spu" v-show="scene === 1" @changeScene="changeScene" />
    <!-- 添加Sku子组件 -->
    <SkuForm ref="sku" v-show="scene === 2" @changeScene="changeScene" />
    <!-- sku列表dialog -->
    <el-dialog v-model="show" title="sku列表">
      <el-table :data="skuArr" border>
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="sku名称" prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" alt="图片缺失" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqGetSpu, reqSkuList, reqRemoveSpu } from '@/api/product/spu'
import { HasSpuResponseData, Records, SkuData, SkuInfoData } from '@/api/product/spu/type'
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import useCategoryStore from '@/store/modules/category'
import type { SpuData } from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()

// 控制场景的可用状态，0:显示已有SPU 1:添加或者修改已有SPU 2:添加SKu的结构
let scene = ref<number>(0)

// 分页器默认的页码
let pageNo = ref<number>(1)

// 一页展示几条数据
let pageSize = ref<number>(3)

// 存储SPU数据的数组
let records = ref<Records>([])

// SPU数据总数
let total = ref<number>(0)

// spuForm组件实例
let spu = ref<any>()

// skuForm组件实例
let sku = ref<any>()

// 要查看的sku列表数组
let skuArr = ref<SkuData[]>([])

// 控制sku列表dialog的显示与隐藏
let show = ref<boolean>(false)

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

// 添加spu按钮
const addSpu = () => {
  // 切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
  spu.value.initAddSpu(categoryStore.c3Id)
}

// 修改spu按钮
const updateSpu = (row: SpuData) => {
  // 切换为场景1:添加与修改已有SPU结构->SpuForm
  scene.value = 1
  // 调用子组件实例方法获取完整已有的SPU的数据
  spu.value.initHasSpuData(row)
}

// 子组件SpuForm绑定自定义事件:目前是让子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
  // 子组件Spuform点击取消变为场景0:展示已有的SPU
  scene.value = obj.flag
  if (obj.params === 'update') {
    // 重新获取一遍spu 更新则留在当前页
    getHasSpu(pageNo.value)
  } else {
    // 重新获取一遍spu 添加返回第一页
    getHasSpu()
  }
}

// 添加sku按钮
const addSku = (row: SpuData) => {
  // 切换场景为2
  scene.value = 2
  sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}

// 查看sku列表按钮
const showSku = async (row: SpuData) => {
  // 显示sku列表dialog
  show.value = true
  // 发请求
  let result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code === 200) {
    skuArr.value = result.data
  }
}

// 删除spu
const deleteSpu = async (row: SpuData) => {
  let result = await reqRemoveSpu(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除SPU成功',
    })
    // 删除后获取剩余的spu数据
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除SPU失败',
    })
  }
}

// 路由组件销毁前，清空仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style lang="less" scoped></style>
