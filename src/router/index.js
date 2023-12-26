import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import pinia from "@/store";
import { useUserStore } from "@/store/user";
import { routesBase, routesCommon } from "./router";

NProgress.configure({ showSpinner: false });

Vue.use(VueRouter);

const store = useUserStore(pinia);

const router = new VueRouter({
	mode: "history",
	base: "/v2case/",
	routes: [...routesBase, ...routesCommon]
});

let isLogin = false;
router.beforeEach((to, from, next) => {
	NProgress.start();
	isLogin = store.role !== null;

	if (to.path === "/login") {
		isLogin ? next({ name: "Home", path: "" }) : next();
	} else {
		isLogin ? next() : next({ name: "Login", path: "/login" });
	}
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
