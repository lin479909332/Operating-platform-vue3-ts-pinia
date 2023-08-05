<template>
  <el-button circle size="small" icon="Refresh" @click="updateRefresh"></el-button>
  <el-button circle size="small" icon="FullScreen" @click="fullScreen"></el-button>
  <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          @change="changeDark"
          inline-prompt
          active-icon="MoonNight"
          inactive-icon="Sunny"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button circle size="small" icon="Setting"></el-button>
    </template>
  </el-popover>
  <img
    :src="userStore.avatar"
    style="height: 24px; width: 24px; border-radius: 50%; margin: 0 10px"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
// 仓库相关
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
// 路由器对象相关
let $router = useRouter()
// 路由对象相关
let $route = useRoute()
// 切换主题相关数据
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 暗黑模式
const dark = ref<boolean>(false)
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
// 点击退出登录
const logout = async () => {
  //1、需要向服务器发请求[退出登录接口](没这个接口省略)
  //2、仓库当中关于用于相关的数据清空[ token|username|avatar]
  await userStore.userLogout()
  //3、跳转到登录页面,同时把退出前的path作为query传入
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
// 切换暗黑模式开关的回调
const changeDark = () => {
  // 获取html根节点
  let html = document.documentElement
  // 根据开关状态决定html标签带不带dark
  dark.value ? (html.className = 'dark') : (html.className = '')
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style lang="scss" scoped></style>
