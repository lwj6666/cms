import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/main",
    component: () => import("../views/main/main.vue")
  },
  {
    path: "/login",
    component: () => import("../views/login/login.vue")
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
