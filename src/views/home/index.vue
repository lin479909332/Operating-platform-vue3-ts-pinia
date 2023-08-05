<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ userStore.username }},{{ getTime() }}好</h3>
        <p class="sub-title">欢迎您来到甄选运营平台</p>
      </div>
    </div>
  </el-card>
  <div class="welcome">
    <svg-icon name="welcome" width="600px" height="500px"></svg-icon>
  </div>
</template>

<script lang="ts" setup>
// 引入用户相关的仓库
import useUserStore from '@/store/modules/user'
// 获取存储用户信息的仓库对象
let userStore = useUserStore()
import { getTime } from '@/utils/time'
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .bottom {
    margin: 20px 0 0 30px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .sub-title {
      font-style: italic;
      font-weight: 300;
      color: #999;
    }
  }
}
.welcome {
  display: flex;
  justify-content: center;
}
</style>
