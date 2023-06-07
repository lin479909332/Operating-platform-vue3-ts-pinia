// 引入组件
import SvgIcon from './SvgIcon/index.vue'
// 全局对象
const allGlobalComponent: any = { SvgIcon }
// 引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 对外暴露插件对象
export default {
  // 务必叫install方法
  install(app: any) {
    Object.keys(allGlobalComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponent[key])
    })
    // 将element-plus提供图标注册为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
