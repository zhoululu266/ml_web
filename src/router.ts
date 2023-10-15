import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/home" },

  {
    path: "/home",
    name: "home",
    component: () => import("../src/views/daPing/index.vue"),
  },
  {
    path: "/syzl",
    name: "syzl",
    component: () => import("../src/views/daPing/syzl.vue"),
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
    next();
  }
);
export default router;
