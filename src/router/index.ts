import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/ShowWords.vue"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../components/AddWords.vue"),
    }
  ],
});

export default router;
