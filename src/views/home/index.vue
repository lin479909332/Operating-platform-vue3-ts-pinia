<template>
  <div>一级路由home</div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
// 组件挂载完毕后获取用户信息
onMounted(() => {
  userStore.userInfo()
})
</script>

<style lang="less" scoped></style>
