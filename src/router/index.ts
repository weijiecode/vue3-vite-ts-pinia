import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
import { start, close } from '@/utils/nprogress'
import useUserStore from '@/store/modules/user'
// 在外边要引入大仓库pinia
import pinia from '@/store'
const userStore = useUserStore(pinia)

// 创建路由器
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title as string
  start()
  let token = userStore.token
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      try {
        await userStore.userInfo()
        next()
      } catch (error) {
        await userStore.userLogout()
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

router.afterEach(() => {
  close()
})

export default router
