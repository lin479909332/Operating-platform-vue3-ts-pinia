<template>
  <el-form label-width="100px">
    <el-form-item label="sku名称">
      <el-input placeholder="请输入sku名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input placeholder="请输入价格" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量（克）">
      <el-input placeholder="请输入重量" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input placeholder="请输入sku描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-row>
        <el-col v-for="item in attrArr" :key="item.id" :span="8">
          <el-form-item :label="item.attrName" style="margin-bottom: 10px">
            <el-select v-model="item.attrIdAndValueId">
              <el-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${item.id}:${attrValue.id}`"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
          <el-select v-model="item.saleIdAndValueId">
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
              :value="`${item.id}:${saleAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="table">
        <el-table-column type="selection" align="center" width="100px"></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" alt="图片缺失" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="warning" size="small" @click="handler(row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reqAttr } from '@/api/product/attr'
import { AttrResponseData, Attr } from '@/api/product/attr/type'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu'
import type { SpuData } from '@/api/product/spu/type'
import type {
  CategoryId,
  SpuHasImg,
  SaleAttrResponseData,
  SpuImg,
  SaleAttr,
  SkuData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
// 父组件的自定义事件
let $emit = defineEmits(['changeScene'])

// el-table表格实例
let table = ref<any>()

// 存储已有属性与属性值
let attrArr = ref<Attr[]>([])

// 商品图片
let imgArr = ref<SpuImg[]>([])

// 已有的SPU销售属性
let saleArr = ref<SaleAttr[]>([])

// 新增sku需要收集的参数
let skuParams = reactive<SkuData>({
  //三级分类的ID
  category3Id: '',
  //已有的SPU的ID
  spuId: '',
  //SPU品牌的ID
  tmId: '',
  //sku名字
  skuName: '',
  //sku价格
  price: '',
  //sku重量
  weight: '',
  //sku的描述
  skuDesc: '',
  // 平台属性
  skuAttrValueList: [],
  // 销售属性
  skuSaleAttrValueList: [],
  //sku图片地址
  skuDefaultImg: '',
})

// 初始化sku数据
const initSkuData = async (c1Id: CategoryId, c2Id: CategoryId, spu: SpuData) => {
  // 收集新增sku需要的参数
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.id as number
  skuParams.tmId = spu.tmId
  // 发请求
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 平台属性
  attrArr.value = result.data
  // 图片
  imgArr.value = result1.data
  // 销售属性
  saleArr.value = result2.data
}

// 设为默认按钮
const handler = (row: SpuImg) => {
  // 表格勾选 先取消全部的勾选，再勾选自己设为默认的那个（排他操作）
  imgArr.value.forEach((item) => {
    table.value.toggleRowSelection(item, false)
  })
  table.value.toggleRowSelection(row, true)
  // 收集默认图片地址
  skuParams.skuDefaultImg = row.imgUrl as string
}

// 保存按钮
const save = async () => {
  // 整理平台属性参数
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId,
      })
    }
    return prev
  }, [])
  // 整理销售属性参数
  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId,
      })
      return prev
    }
  }, [])
  // 发请求
  let result = await reqAddSku(skuParams)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加sku成功',
    })
    // 成功后通知父组件切换为场景0
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({
      type: 'error',
      message: '添加sku失败',
    })
  }
}

// 取消按钮
const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}

defineExpose({
  initSkuData,
})
</script>

<style lang="scss" scoped></style>
