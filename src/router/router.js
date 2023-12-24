export const routesBase = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login.vue")
	}
];

export const routesCommon = [
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
		path: "/*",
		redirect: "/error"
	}
];
