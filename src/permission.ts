// 路由鉴权:鉴权,项目当中路由能不能被的权限的设置
// 路由什么情况下可以被访问，什么情况下不可以被访问

import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import setting from './setting'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
// 关闭右侧的加载球
nprogress.configure({ showSpinner: false })
import useUserStore from '@/store/modules/user'
import pinia from './store'
// 这里拿不到要导入pinia
let userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(
  async (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    document.title = `${setting.title} - ${to.meta.title}`
    console.log(from)
    nprogress.start()
    // 获取用户token判断用户是否登录
    let token = userStore.token
    let username = userStore.username
    if (token) {
      // 用户已登录
      // 不让跳转到login，重定向到home
      if (to.path === '/login') {
        next({ path: '/' })
      } else {
        // 其余放行(存在用户名的情况下)
        if (username) {
          next()
        } else {
          try {
            // 重新获取用户信息
            await userStore.userInfo()
          } catch (error) {
            // token过期:获取不到用户信息了或者用户手动修改本地存储token
            // 退出登录并回到首页,并保留要去的path
            userStore.userLogout()
            next({ path: '/login', query: { redirect: to.path } })
          }
        }
      }
    } else {
      // 用户未登录
      if (to.path === '/login') {
        next()
      } else {
        // 跳转到login同时保存想要跳转的path到query里
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
    next()
  },
)

// 全局后置守卫
router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log(to)
    console.log(from)
    nprogress.done()
  },
)
