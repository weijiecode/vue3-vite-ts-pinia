export const constantRoute = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
        title: '登录',
        hidden: true // 菜单中是否隐藏
    }
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
        title: 'layout',
        hidden: false
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '首页',
            hidden: false
        }
      },
      {
        path: '/ceshi',
        component: () => import('@/views/home/index.vue'),
        meta: {
            title: '测试',
            hidden: false
        }
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
        title: '404',
        hidden: true
    }
  },
  {
    path: '/:pathMath(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '任意路由',
        hidden: true,
    }
  },
]
