import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import { routesBase, routesCommon } from "./router";

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: "/v2case/",
	routes: [...routesBase, ...routesCommon]
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	if (to.path !== "/login") next("/login");
	else next();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
