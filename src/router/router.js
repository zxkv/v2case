import Layout from "@/layout/index.vue";

export const baseRouters = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/base/Login.vue")
	}
];

export const commonRouters = [
	{
		path: "/user",
		component: Layout,
		hidden: true,
		children: [
			{
				path: "",
				name: "User",
				component: () => import("@/views/common/User.vue"),
				meta: { title: "个人中心" }
			}
		]
	},
	{
		path: "/error",
		name: "Error",
		hidden: true,
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
		// redirect: "",
		meta: { title: "仪表盘", icon: "el-icon-odometer" },
		children: [
			{
				path: "",
				name: "Dashboard",
				component: () => import("@/views/home/index.vue"),
				meta: { title: "仪表盘" }
			}
		]
	},
	{
		path: "/data",
		component: Layout,
		meta: { title: "数据图表", icon: "el-icon-s-marketing" },
		children: [
			{
				path: "",
				name: "VData",
				component: () => import("@/views/data/index.vue"),
				meta: { title: "数据面板" }
			}
		]
	},
	{
		path: "/code",
		component: Layout,
		meta: { title: "组件案例", icon: "el-icon-s-opportunity" },
		children: [
			{
				path: "",
				name: "VCode",
				component: () => import("@/views/code/index.vue"),
				meta: { title: "案例面板" }
			}
		]
	}
];
