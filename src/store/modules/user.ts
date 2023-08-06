// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入类型
import type { LoginFormData, LoginResponseData, UserInfoResponseData } from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
// 引入登录接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
// 存储 读取token的方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute, asyncRoute, anyRoute } from '@/router/routes'
import router from '@/router'
// 引入深拷贝方法
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'

// 用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
  return asyncRoute.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

// 重置路由(先移除所有路由，再添加常量路由)
function resetRouter() {
  // 获取所有路由
  router.getRoutes().forEach((route) => {
    // 获取路由name
    const { name } = route
    // 移除所有路由
    router.hasRoute(name as string) && router.removeRoute(name as string)
  })
}

// 创建小仓库
let useUserStore = defineStore('User', {
  // 小仓库存储数据的地方
  state: (): UserState => {
    return {
      // 用户唯一标识token(持久化储存)
      // token:''
      token: GET_TOKEN(),
      // 仓库存储生成菜单需要数组（路由)
      menusRoutes: constantRoute,
      // 用户名
      username: '',
      // 用户头像
      avatar: '',
      // 按钮权限数组
      buttons: [],
    }
  },
  // 处理异步或逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: LoginFormData) {
      let result: LoginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data as string
        // 持久化存储token
        SET_TOKEN(result.data as string)
        // 能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        // 能保证当前async函数返回一个失败的promise
        return Promise.reject(new Error(result.data))
      }
    },
    // 获取用户信息的方法
    async userInfo() {
      let result: UserInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        // 先重置一次路由
        resetRouter()
        // 添加常量路由
        ;[...constantRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        // 计算当前用户需要展示的异步路由
        let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes)
        // 整理菜单需要的数据
        this.menusRoutes = [...constantRoute, ...userAsyncRoute, ...anyRoute]
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        ;[...userAsyncRoute, ...anyRoute].forEach((route: any) => {
          router.addRoute(route)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出登录
    async userLogout() {
      let result: any = await reqLogout()
      if (result.code === 200) {
        // 退出登录成功
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
