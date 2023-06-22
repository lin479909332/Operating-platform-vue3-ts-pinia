<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
      <el-input placeholder="请输入SPU名称" v-model="SpuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select placeholder="请选择SPU品牌" v-model="SpuParams.tmId">
        <el-option
          v-for="item in allTradeMark"
          :key="item.id"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请输入SPU描述"
        v-model="SpuParams.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
      <el-upload
        v-model:file-list="imgList"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeUpload"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 50%; height: 50%" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <!-- 展示销售属性的下拉菜单 -->
      <el-select
        v-model="saleAttrIdAndValueName"
        :placeholder="unSelectSaleAttr.length ? `还有${unSelectSaleAttr.length}个未选择` : '无'"
      >
        <el-option
          v-for="item in unSelectSaleAttr"
          :key="item.id"
          :label="item.name"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        :disabled="!saleAttrIdAndValueName"
        style="margin-left: 10px"
        type="primary"
        icon="plus"
        @click="addSaleAttr"
      >
        添加销售属性
      </el-button>
      <!-- table展示销售属性与属性值的地方 -->
      <el-table border style="margin: 10px 0" :data="saleAttr">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column
          label="销售属性名"
          align="center"
          width="140px"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="销售属性值">
          <template #="{ row }">
            <el-tag
              v-for="item in row.spuSaleAttrValueList"
              :key="item.id"
              class="mx-1"
              closable
              style="margin: 0 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-button type="success" icon="plus" size="small"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template #="{ row, $index }">
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="saleAttr.splice($index, 1)"
            ></el-button>
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
import { ref, computed } from 'vue'
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
  SpuData,
  AllSaleAttr,
  AllTradeMark,
  SpuHasImg,
  SaleAttrResponseData,
  AllSaleAttrResponseData,
} from '@/api/product/spu/type'
import { ElMessage } from 'element-plus'
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

//存储已有的SPU对象
let SpuParams = ref<SpuData>({
  //收集三级分类的ID
  category3Id: '',
  //SPU的名字
  spuName: '',
  //SPU的描述
  description: '',
  //品牌的ID
  tmId: '',
  spuImageList: [],
  spuSaleAttrList: [],
})

// 将来收集还未选择的销售属性的ID与属性值的名字
const saleAttrIdAndValueName = ref<string>('')

const initHasSpuData = async (spu: SpuData) => {
  // 形参spu:即为父组件传递过来的已有的SPU对象[不完整]
  //存储已有的SPU对象,将来在模板中展示
  SpuParams.value = spu
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
  imgList.value = result1.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  // 已有的SPU销售属性
  saleAttr.value = result2.data
  // 全部销售属性
  allSaleAttr.value = result3.data
}

// 控制dialog的显示与隐藏
let dialogVisible = ref<boolean>(false)

// dialog里的图片地址
let dialogImageUrl = ref<string>('')

// 照片墙点击预览的钩子
const handlePictureCardPreview = (file: any) => {
  // 给dialog里的图片赋值
  dialogImageUrl.value = file.url
  // 显示dialog
  dialogVisible.value = true
}

// 照片墙删除文件的钩子
const handleRemove = () => {
  console.log('删除了照片墙的文件')
}

// 照片墙上传文件之前的钩子
const beforeUpload = (file: any) => {
  if (file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpeg') {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '图片不能大于3MB',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '只允许上传png|gif|jpeg格式的图片',
    })
    return false
  }
}

// 计算出还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  let unSelectArr = allSaleAttr.value.filter((item) => {
    return saleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})

// 新增销售属性值
const addSaleAttr = () => {
  /*
  baseSaleAttrId: number | string
  saleAttrValueName: string
  spuSaleAttrValueList: spuSaleAttrValueList
  */
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  let newSaleAttr: SaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  // 添加到数组中
  saleAttr.value.push(newSaleAttr)
  // 清空收集的数据
  saleAttrIdAndValueName.value = ''
}

// 对外暴露
defineExpose({
  initHasSpuData,
})
</script>

<style lang="scss" scoped></style>
