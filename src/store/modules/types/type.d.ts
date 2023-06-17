// 引入路由对象的type
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'

// 定义小仓库state数据类型
export interface UserState {
  token: string | null
  menusRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

// 定义分类仓库state对象的类型
export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: number | string
}
