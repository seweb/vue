import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/containers/Layout.vue'
import { authRoutes } from '@/modules/auth/router'
import { userRoutes } from '@/modules/user/router'
import { articlesRoutes } from '@/modules/articles/router'
import { profileRoutes } from '@/modules/profile/router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      ...authRoutes,
      ...userRoutes,
      ...articlesRoutes,
      ...profileRoutes
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
