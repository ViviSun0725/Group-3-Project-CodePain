import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/MainLayout.vue"),
      redirect: "/trending",
      children: [
        {
          path: "search",
          name: "search",
          component: () => import("../views/Search.vue"),
        },
        {
          path: "signup",
          name: "signup",
          component: () => import("../views/Signup.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("../views/Login.vue"),
        },
        {
          path: "search",
          name: "search",
          component: () => import("../views/Search.vue"),
        },
        {
          path: "your-work",
          name: "your-work",
          component: () => import("../views/YourWork.vue"),
        },
        {
          path: "trending",
          name: "trending",
          component: () => import("../views/Trending.vue"),
        },
        {
          path: "/following",
          name: "following",
          component: () => import("../views/Following.vue"),
        },
        {
          path: "/profile",
          name: "profile",
          component: () => import("../views/Profile.vue"),
        },
        {
          path: "settings",
          redirect: "profile",
          children: [
            {
              path: "profile",
              name: "SettingProfile",
              component: () => import("../views/SettingProfile.vue"),
            },
            {
              path: "account",
              name: "settingAccount",
              component: () => import("../views/SettingAccount.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/pen",
      name: "pen",
      component: () => import("../views/Pen.vue"),
    },
  ],
});

export default router;
