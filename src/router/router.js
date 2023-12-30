import Layout from "@/layout/index.vue";

export const baseRouters = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/base/Login.vue")
	}
];

const commonRouters = [
	{
		path: "/error",
		name: "Error",
		component: () => import("@/views/base/Error.vue"),
		meta: { title: "页面不存在" }
	},
	{
		path: "*",
		redirect: "/error"
	}
];

export const asyncRouters = [
	{
		path: "/",
		component: Layout,
		children: [
			{
				path: "",
				name: "Dashboard",
				component: () => import("@/views/home/index.vue"),
				meta: { title: "仪表盘" }
			}
		]
	},
	...commonRouters
];
