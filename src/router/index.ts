import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: '/lessons/:lessonsId', // Parent route
      name: 'lessons',
      component: () => import("../views/ShowWords.vue"),
      children: [
        {
          path: "", // This route is now handled under the parent
          name: "lesson", // Child route with a name
          component: () => import("../views/ShowWords.vue"),
          meta: {
            title: "Lesson",
          },
        },
      ],
    },
    {
      path: "/add",
      name: "add",
      component: () => import("../views/AddWords.vue"),
    },
  ],
});

export default router;
