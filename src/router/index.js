import VueRouter from "vue-router";
import { baseRouters, asyncRouters, commonRouters } from "./router";

const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originPush.call(this, location).catch(err => err);
};

const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
	return originReplace.call(this, location).catch(err => err);
};

const env = import.meta.env.MODE;

const createRouter = () =>
	new VueRouter({
		mode: "history",
		base: env === "development" ? null : "/v2case/",
		routes: [...baseRouters, ...asyncRouters, ...commonRouters],
		scrollBehavior: () => ({ x: 0, y: 0 })
	});

const router = createRouter();

export const resetRouter = () => {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher;
};

export default router;
