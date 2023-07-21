import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage/LoginPage.vue"
import IbmStock from "../pages/Home/HomePage.vue"

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: "/ibm-stock",
    name: "IbmStock",
    component: IbmStock,
    meta: { requiresAuth: true, menu: "stock" }
  },
  // Error Page
  {
    path: '/:catchAll(.*)',
    redirect: '/ibm-stock'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: "/",
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior(savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        selector: window.scrollTo(0, 0),
        behavior: "smooth",
      };
    }
  },
});

export default router;
