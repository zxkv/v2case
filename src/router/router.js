export const baseRouters = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login.vue")
	}
];

export const asyncRouters = [
	{
		path: "",
		name: "Home",
		component: () => import("@/views/Home.vue")
	},
	{
		path: "/error",
		name: "Error",
		component: () => import("@/views/Error.vue")
	},
	{
		path: "*",
		redirect: "/error"
	}
];
