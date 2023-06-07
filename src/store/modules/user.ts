// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from '@/store/modules/types/type'
// 引入登录接口
import { reqLogin } from '@/api/user/index'
// 存储 读取token的方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
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
    }
  },
  // 处理异步或逻辑的地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      let result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        this.token = result.data.token as string
        // 持久化存储token
        SET_TOKEN(result.data.token as string)
        // 能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        // 能保证当前async函数返回一个失败的promise
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})
// 对外暴露获取小仓库的方法
export default useUserStore
