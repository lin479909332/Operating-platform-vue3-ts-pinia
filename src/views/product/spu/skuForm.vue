<template>
  <el-form label-width="100px">
    <el-form-item label="sku名称">
      <el-input placeholder="请输入sku名称"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input placeholder="请输入价格" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量（克）">
      <el-input placeholder="请输入重量"></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input placeholder="请输入sku描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-row>
        <el-col v-for="item in attrArr" :key="item.id" :span="6">
          <el-form-item :label="item.attrName" style="margin-bottom: 10px">
            <el-select>
              <el-option
                v-for="attrValue in item.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName">
          <el-select>
            <el-option
              v-for="saleAttrValue in item.spuSaleAttrValueList"
              :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr">
        <el-table-column type="selection" align="center" width="100px"></el-table-column>
        <el-table-column label="图片">
          <template #="{ row }">
            <img :src="row.imgUrl" alt="图片缺失" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row }">
            <el-button type="warning" size="small">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reqAttr } from '@/api/product/attr'
import { AttrResponseData, Attr } from '@/api/product/attr/type'
import { reqSpuImageList, reqSpuHasSaleAttr } from '@/api/product/spu'
import type {
  CategoryId,
  SpuHasImg,
  SaleAttrResponseData,
  SpuImg,
  SaleAttr,
} from '@/api/product/spu/type'
import { ref } from 'vue'
// 父组件的自定义事件
let $emit = defineEmits(['changeScene'])

// 存储已有属性与属性值
let attrArr = ref<Attr[]>([])

// 商品图片
let imgArr = ref<SpuImg[]>([])

// 已有的SPU销售属性
let saleArr = ref<SaleAttr[]>([])

// 初始化sku数据
const initSkuData = async (c1Id: CategoryId, c2Id: CategoryId, spu: any) => {
  // 发请求
  let result: AttrResponseData = await reqAttr(c1Id, c2Id, spu.category3Id)
  let result1: SpuHasImg = await reqSpuImageList(spu.id)
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id)
  // 平台属性
  attrArr.value = result.data
  // 图片
  imgArr.value = result1.data
  // 销售属性
  saleArr.value = result2.data
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
