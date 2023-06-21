import type { RouteRecordRaw } from 'vue-router'

// 小仓库的state类型
export interface UserState {
  token: string|null,
  menuRoutes: RouteRecordRaw[]
}