<template>
  <el-button
    circle
    size="small"
    icon="Refresh"
    @click="updateRefresh"
  ></el-button>
  <el-button
    circle
    size="small"
    icon="FullScreen"
    @click="fullScreen"
  ></el-button>
  <el-button circle size="small" icon="Setting"></el-button>
  <img
    src="../../../../public/logo.jpg"
    style="height: 24px; width: 24px; border-radius: 50%; margin: 0 10px"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import {} from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
// 用户点击刷新按钮后修改仓库里的值
const updateRefresh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
// 用户点击全屏按钮
const fullScreen = () => {
  // DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
  let full = document.fullscreenElement
  if (!full) {
    // 切换为全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss" scoped></style>
