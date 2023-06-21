// 创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import type { loginFormData, loginResponseData } from '@/api/user/type'
// 引入路由
import { constantRoute } from '@/router/routes'
// 创建用户小仓库
let useUserStore = defineStore('User', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, // 仓库存储生成菜单需要数组（路由）
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      let result: loginResponseData = await reqLogin(data)
      console.log(result)
      if (result.code == 200) {
        this.token = (result.data.token as string)
        // 本地持久化存储一份
        SET_TOKEN(result.data.token as string)
        // 能保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
