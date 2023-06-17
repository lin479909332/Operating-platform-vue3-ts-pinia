<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="c1Handler" placeholder="请选择一级分类">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="c2Handler" placeholder="请选择二级分类">
          <el-option
            v-for="c2 in categoryStore.c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" @change="c3Handler" placeholder="请选择三级分类">
          <el-option
            v-for="c3 in categoryStore.c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
// 引入分类相关仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

// 获取一级分类数据
onMounted(() => {
  getC1()
})

// 获取一级分类数据的方法
const getC1 = () => {
  categoryStore.getC1()
}

// 此方法即为一级分类下拉菜单的change事件(选中值的时候会触发,保证一级分类ID有了)
const c1Handler = () => {
  // 一级id发生变化后清空掉二级三级的id，同时清空掉三级的数组，因为二级的会重新获取所以不用清空
  categoryStore.c2Id = ''
  categoryStore.c2Arr = []
  categoryStore.c3Id = ''
  categoryStore.getC2()
}

// 此方法即为二级分类下拉菜单的change事件(选中值的时候会触发,保证二级分类ID有了)
const c2Handler = () => {
  // 二级id发生变化后清空掉三级的id
  categoryStore.c3Id = ''
  categoryStore.getC3()
}

// 此方法即为三级分类下拉菜单的change事件(选中值的时候会触发,保证三级分类ID有了)
const c3Handler = () => {}
</script>

<style lang="scss" scoped></style>
