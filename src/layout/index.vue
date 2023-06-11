<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <Logo></Logo>
      <!-- 滚动条 -->
      <el-scrollbar class="scrollbar">
        <!-- 左侧菜单展示 -->
        <el-menu
          :collapse="layoutSettingStore.fold ? true : false"
          :default-active="$router.path"
          background-color="#001529"
          text-color="#fff"
          active-text-color="yellowgreen"
        >
          <Menu :menuList="userStore.menusRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--顶部导航-->
    <div class="layout_tabbar" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <Tabbar></Tabbar>
    </div>
    <!--内容展示区域-->
    <div class="layout_main" :class="{ fold: layoutSettingStore.fold ? true : false }">
      <Main></Main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
// 获取用户相关的仓库
import useUserStore from '@/store/modules/user'
//引入左侧菜单logo子组件
import Logo from '@/layout/logo/index.vue'
// 菜单
import Menu from '@/layout/menu/index.vue'
// 右侧内容区域
import Main from '@/layout/main/index.vue'
// 顶部导航菜单tabbar
import Tabbar from '@/layout/tabbar/index.vue'
import useLayoutSettingStore from '@/store/modules/setting'
import {} from 'vue'
let userStore = useUserStore()
let layoutSettingStore = useLayoutSettingStore()
// 获取路由对象
let $router = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style lang="scss" scoped>
.layout_container {
  width: 100%;
  height: 100vh;
  white-space: nowrap;
  .layout_slider {
    color: #fff;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    padding-top: 10px;
    transition: all 0.3s;

    &.fold {
      width: $base-menu-min-width;
    }
    .scrollbar {
      // 自己调多了20px出来
      width: 100%;
      height: calc(100vh - $base-tabbar-height - 20px);
      margin-top: 10px;

      .el-menu {
        border-right: none;
      }
    }
  }
  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
