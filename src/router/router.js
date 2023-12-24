export const routesBase = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/Login.vue")
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

export const routesCommon = [];
