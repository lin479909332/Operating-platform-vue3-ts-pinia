<template>
  <el-button circle size="small" icon="Refresh"></el-button>
  <el-button circle size="small" icon="FullScreen"></el-button>
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
</script>

<style lang="scss" scoped></style>
