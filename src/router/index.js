import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/dashboard/DashboardView.vue')
    },
    {
      path: '/manage/user',
      name: '/manage/user',
      component: () => import('@/components/ManageUser.vue')
    },
    {
      path: '/manage/role',
      name: '/manage/role',
      component: () => import('@/components/ManageRole.vue')
    },
    {
      path: '/manage/permission',
      name: '/manage/permission',
      component: () => import('@/components/ManagePermission.vue')
    },
    {
      path: '/pic/upload',
      name: '/pic/upload',
      component: () => import('@/views/content/PicStore/PicUploadView.vue')
    },
    {
      path: '/pic/list',
      name: 'pic-list',
      component: () => import('@/views/content/PicStore/PicListView.vue')
    },
    {
      path: '/pic/config',
      name: 'pic-config',
      component: () => import('@/views/content/PicStore/PicConfigView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/result/Status404.vue')
    }
  ]
})

export default router
