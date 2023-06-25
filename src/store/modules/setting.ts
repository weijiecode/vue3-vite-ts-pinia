// 小仓库关于layout相关配置
import { defineStore } from 'pinia'

let useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      fold: false, // 菜单折叠
      refsh: false, // 控制刷新
    }
  },
})

export default useLayOutSettingStore