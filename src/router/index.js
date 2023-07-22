import { createRouter, createWebHistory } from "vue-router";

import LoginPage from "../pages/LoginPage/LoginPage.vue"
import StockData from "../pages/Home/HomePage.vue"

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: "/stock-data",
    name: "StockData",
    component: StockData,
    meta: { requiresAuth: true, menu: "stock" }
  },
  // Error Page
  {
    path: '/:catchAll(.*)',
    redirect: '/stock-data'
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
