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
      <el-form :inline="true">
        <el-form-item label="内存">
          <el-select>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内存">
          <el-select>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
            <el-option label="256"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item label="颜色">
          <el-select>
            <el-option label="白色"></el-option>
            <el-option label="黑色"></el-option>
            <el-option label="蓝色"></el-option>
            <el-option label="金色"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border>
        <el-table-column type="selection" align="center" width="80px"></el-table-column>
        <el-table-column label="图片"></el-table-column>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {} from 'vue'
let $emit = defineEmits(['changeScene'])

const cancel = () => {
  $emit('changeScene', { flag: 0, params: '' })
}
</script>

<style lang="scss" scoped></style>
