// 路由鉴权:鉴权,项目当中路由能不能被的权限的设置
// 路由什么情况下可以被访问，什么情况下不可以被访问

import router from '@/router'
import { RouteLocationNormalized } from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next) => {
    console.log(to)
    console.log(from)
    nProgress.start()
    next()
  },
)

// 全局后置守卫
router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    console.log(to)
    console.log(from)
    nProgress.done()
  },
)
