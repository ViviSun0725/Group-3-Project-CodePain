import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "mainLayout",
			component: () => import("../layouts/MainLayout.vue"),
			children: [
				{
					path: "",
					name: "redirect", //沒有name vue會報錯 但可以用 先隨便加個name試試
					redirect: "/trending",
				},
				{
					path: "your-work",
					name: "your-work",
					component: () => import("../views/YourWork.vue"),
				},
				{
					path: "following",
					name: "following",
					component: () => import("../views/Following.vue"),
				},
				{
					path: "trending",
					name: "trending",
					component: () => import("../views/Trending.vue"),
				},
				{
					path: "user/:userId",
					name: "profile",
					component: () => import("../views/Profile.vue"),
				},
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
					path: "settings",
					component: () => import("../layouts/SettingLayout.vue"),
					children: [
						{
							path: "",
							redirect: "settings/profile",
						},
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
