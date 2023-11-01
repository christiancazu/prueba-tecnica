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
        component: () => import('../views/Home.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/Products.vue'),
        children: [
          {
            path: ':category',
            name: 'Category',
            component: () => import('../components/ProductList.vue')
          }
        ]
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
