<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button @click="addAttr" type="primary" icon="plus" :disabled="!categoryStore.c3Id">
          添加平台属性
        </el-button>
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
              <el-button type="warning" size="small" icon="edit" @click="updateAttr"></el-button>
              <el-button type="danger" size="small" icon="delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene === 1">
        <el-form :inline="true">
          <el-form-item label="属性名称">
            <el-input v-model="attrParams.attrName" placeholder="请输入属性名称"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          @click="addAttrValue"
          :disabled="!attrParams.attrName"
          type="primary"
          icon="plus"
        >
          添加属性值
        </el-button>
        <el-button @click="cancel">取消</el-button>
        <el-table :data="attrParams.attrValueList" border style="margin: 10px 0">
          <el-table-column label="序号" width="100px" type="index" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                v-if="row.flag"
                @blur="toLook(row, $index)"
                size="small"
                v-model="row.valueName"
                placeholder="请输入属性值"
              ></el-input>
              <div v-else @click="toEdit(row)">{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="属性值操作"></el-table-column>
        </el-table>
        <el-button @click="save" :disabled="!attrParams.attrValueList.length" type="primary">
          保存
        </el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive } from 'vue'
import { reqAttr, reqAddOrUpdateAttr } from '@/api/product/attr/index'
import useCategoryStore from '@/store/modules/category'
import { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type'
import { ElMessage } from 'element-plus'
let categoryStore = useCategoryStore()
// 存储已有属性与属性值
let attrArr = ref<Attr[]>([])

// 定义card组件内容切换变量 scene=0,显示table, scene=1,展示添加与修改属性结构
let scene = ref<number>(0)

// 收集新增的属性的数据
let attrParams = reactive<Attr>({
  // 新增属性的名字
  attrName: '',
  //新增属性值数组
  attrValueList: [],
  // 三级分类id
  categoryId: '',
  // 代表三级分类
  categoryLevel: 3,
})

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

// 添加属性
const addAttr = () => {
  // 清空上一次的属性值
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    // 在这里顺便收集三级分类的id
    categoryId: categoryStore.c3Id,
    // 代表三级分类
    categoryLevel: 3,
  })
  // 切换场景
  scene.value = 1
}

// 添加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    // true编辑模式 false查看模式
    flag: true,
  })
}

// 编辑属性
const updateAttr = () => {
  // 切换场景
  scene.value = 1
}

// 取消按钮
const cancel = () => {
  // 切换场景
  scene.value = 0
}

// 保存按钮
const save = async () => {
  let result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code === 200) {
    // 切换场景
    scene.value = 0
    // 提示信息
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    // 重新获取属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}

// input失焦事件，切换为查看模式
const toLook = (row: AttrValue, $index: number) => {
  // 非法情况1 用户输入空串
  if (row.valueName.trim() === '') {
    // 清空掉空白对象
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值名称不能为空',
    })
    return
  }
  // 非法情况2 用户输入的重复的属性值名称
  let repeat = attrParams.attrValueList.find((item) => {
    // 切记排除掉自身后再进行判断
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  // 出现了属性值重复
  if (repeat) {
    // 清空掉重复属性值的哪个对象
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值名称不能重复',
    })
    return
  }
  row.flag = false
}

// 点击div框，切换为编辑模式
const toEdit = (row: AttrValue) => {
  row.flag = true
}
</script>

<style lang="less" scoped></style>
