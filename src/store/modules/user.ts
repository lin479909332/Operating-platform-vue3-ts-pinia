// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import type { UserState } from '@/store/modules/types/type'
// 引入登录接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user/index'
// 存储 读取token的方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
// 引入路由（常量路由）
import { constantRoute } from '@/router/routes'
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
    }
  },
  // 处理异步或逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: any) {
      let result: any = await reqLogin(data)
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
      let result = await reqUserInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    // 用户退出登录
    async userLogout() {
      let result = await reqLogout()
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
