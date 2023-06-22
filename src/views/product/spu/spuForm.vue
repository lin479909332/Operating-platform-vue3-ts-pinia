<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择SPU品牌">
        <el-option label="nikke"></el-option>
        <el-option label="公主连结"></el-option>
        <el-option label="碧蓝航线"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="请输入SPU描述"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="fileList"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select placeholder="请选择SPU销售属性">
        <el-option label="nikke"></el-option>
        <el-option label="公主连结"></el-option>
        <el-option label="碧蓝航线"></el-option>
      </el-select>
      <el-button style="margin-left: 10px" type="primary" icon="plus">添加销售属性</el-button>
      <el-table border style="margin: 10px 0">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="销售属性名" width="140px"></el-table-column>
        <el-table-column label="销售属性值"></el-table-column>
        <el-table-column label="操作" width="140px"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { SpuData } from '@/api/product/spu/type'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSpuHasSaleAttr,
  reqAllSaleAttr,
} from '@/api/product/spu/index'
import type {
  TradeMark,
  SpuImg,
  SaleAttr,
  AllSaleAttr,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
} from '@/api/product/spu/type'
let $emit = defineEmits(['changeScene'])

// 取消按钮
const cancel = () => {
  $emit('changeScene', 0)
}

// 存储已有的spu数据
let allTradeMark = ref<TradeMark[]>([])
// 商品图片
let imgList = ref<SpuImg[]>([])
// 已有的SPU销售属性
let saleAttr = ref<SaleAttr[]>([])
// 全部销售属性
let allSaleAttr = ref<AllSaleAttr[]>([])

const initHasSpuData = async (spu: SpuData) => {
  // spu:即为父组件传递过来的已有的SPU对象[不完整]
  // 获取全部品牌的数据
  let result: AllTradeMark = await reqAllTradeMark()
  // 获取某一个品牌旗下全部售卖商品的图片
  let result1: SpuHasImg = await reqSpuImageList(spu.id as number)
  // 获取已有的SPU销售属性的数据
  let result2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
  // 获取整个项目全部SPU的销售属性
  let result3: AllSaleAttrResponseData = await reqAllSaleAttr()
  // 存储全部品牌数据
  allTradeMark.value = result.data
  // SPU对应商品图片
  imgList.value = result1.data
  // 已有的SPU销售属性
  saleAttr.value = result2.data
  // 全部销售属性
  allSaleAttr.value = result3.data
}

// 对外暴露
defineExpose({
  initHasSpuData,
})
</script>

<style lang="scss" scoped></style>
