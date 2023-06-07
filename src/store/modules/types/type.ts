// 引入路由对象的type
import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库state数据类型
export interface UserState {
  token: string | null
  menusRoutes: RouteRecordRaw[]
}
