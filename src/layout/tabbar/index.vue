<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Breadcrumb from '@/layout/tabbar/breadcrumb/index.vue'
import Setting from '@/layout/tabbar/setting/index.vue'
import {} from 'vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #0ebedf;
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
