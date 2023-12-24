import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import { routesBase, routesCommon } from "./router";
NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const hasProd = import.meta.env.VITE_APP_ENV === "production";

const router = new VueRouter({
	mode: "history",
	base: hasProd ? "/v2case/" : "./",
	routes: [...routesBase, ...routesCommon]
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
