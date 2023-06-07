//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      // 用户控制菜单折叠还是收起
      fold: false,
    }
  },
})

export default useLayoutSettingStore
