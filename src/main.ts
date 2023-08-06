import { createApp } from 'vue'
import App from './App.vue'
// 引入element-plus的插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 忽略当前文件ts类型的检测否则有红色提示(打包会失败)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入自定义插件对象:注册整个项目全局组件
import globalComponent from '@/components'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入模板的全局的样式
import '@/styles/index.scss'
// 引入暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入路由
import router from '@/router'
// 引入仓库
import pinia from './store'
// 获取应用实例对象
const app = createApp(App)
// 安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn,
})
//安装自定义插件
app.use(globalComponent)
// 注册模板路由
app.use(router)
// 引入路由鉴权
import './permission'
// 安装仓库
app.use(pinia)
// 引入自定义指令文件
import { isHasButton } from '@/directive/has'
isHasButton(app)
// 将应用挂载到挂载点上
app.mount('#app')
