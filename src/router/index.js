import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' //这个样式必须引入
import Layout from '@/views/DashboardPage/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage/index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TextPage/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginPage/index.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Layout,
      redirect: '/dashboard/detection',
      children: [
        {
          path: 'detection',
          name: 'dashboard-Detection',
          component: () => import('@/views/DashboardPage/Detection/index.vue')
        },
        {
          path: 'generation',
          name: 'dashboard-Image',
          component: () => import('@/views/DashboardPage/Generation/index.vue')
        },
        {
          path: 'replace',
          name: 'dashboard-Replace',
          component: () => import('@/views/DashboardPage/Replace/index.vue')
        },
        {
          path: 'transfer',
          name: 'dashboard-Transfer',
          component: () => import('@/views/DashboardPage/Transfer/index.vue')
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/exceptionPage/404/index.vue')
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/views/exceptionPage/500/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('@/views/exceptionPage/404/index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/testPage/index.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (to.name === 'NotFound') {
    next('/404')
    return
  }

  try {
    //const isLogin = await getHelloWorld()
    //console.log(isLogin)
    nextTick(() => {
      // 如果路由是 catch-all 路由
      //if (isLogin.code === 200) {
      if (true) {
        // 如果用户停留在500页，重定向至首页
        if (to.name === '500') {
          next('/')
          return
        }
        next()
      } else {
        if (to.path === '/login') next()
        next('/login')
      }
    })
  } catch (err) {
    if (to.name !== '500') next('/500')
    else next()
  }
  NProgress.done()
})

export default router
