<template>
  <div class="box">
    <div class="image">
      <img src="../../assets/images/error_images/404.png" alt="" />
    </div>
    <el-button size="large" type="primary" @click="goHome">点我返回首页</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
let $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .image {
    img {
      margin-left: 20%;
    }
  }
}
</style>
