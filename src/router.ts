import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/dp" },

  {
    path: "/dp",
    name: "dp",
    component: () => import("../src/views/daPing/index.vue"),
  },
  {
    path: "/dj",
    name: "dj",
    component: () => import("../src/views/dangJian/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach(
  (
    to: { path: string },
    _from: any,
    next: (arg0?: string | undefined) => void
  ) => {
    // if (to.path === "/login" ||to.path ==='/login/zhuce'||to.path ==='/login/wjmm') return next();
    // const tokenStr = window.sessionStorage.getItem("token");
    // if(!tokenStr) return next('/login')
    next();
    // next();
  }
);
export default router;
