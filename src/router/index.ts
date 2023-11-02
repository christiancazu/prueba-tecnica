import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'Home',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: 'products/:category?',
        name: 'Products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: 'my-order',
        name: 'MyOrder',
        component: () => import('../views/MyOrderView.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('../views/Error404.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
