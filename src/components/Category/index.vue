<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" placeholder="请选择一级分类">
          <el-option
            v-for="c1 in categoryStore.c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择二级分类">
          <el-option label="公主连结"></el-option>
          <el-option label="碧蓝航线"></el-option>
          <el-option label="nikke"></el-option>
          <el-option label="碧蓝档案"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择三级分类">
          <el-option label="公主连结"></el-option>
          <el-option label="碧蓝航线"></el-option>
          <el-option label="nikke"></el-option>
          <el-option label="碧蓝档案"></el-option>
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
</script>

<style lang="scss" scoped></style>
