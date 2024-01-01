import Layout from "@/layout/index.vue";
import ChildView from "@/layout/LayMain.vue";

/**
 * @description 处理组件加载
 * @param {String} view 组件路径
 * @return {Function} 组件地址
 *  */
const asyncLoadView = view => {
	if (process.env.NODE_ENV === "development") {
		return resolve => require([`@/views/${view}.vue`], resolve);
	} else {
		return () => import(`@/views/${view}.vue`);
	}
};

/**
 * @description 获取重定向路径
 * @param {Object} route 路由对象
 * @return {String} 重定向Url
 *  */
const dealRedirectPath = route => {
	if (route?.children?.length) {
		return dealRedirectPath(route.children[0]);
	} else {
		return route.path;
	}
};

/**
 * @description 动态处理组件
 * @param {Array} asyncRouterMap 路由数组
 * @return {Array} 处理后的数组
 *  */
export const filterAsyncRouter = (asyncRouterMap = []) => {
	return asyncRouterMap.filter(route => {
		// 处理重定向
		if (route?.children?.length) {
			if (route?.component === "Layout" || route?.component === "ChildView") {
				route.redirect = dealRedirectPath(route);
			}
		}
		// 组件加载
		if (route?.component) {
			if (route.component === "Layout") {
				route.component = Layout;
			} else if (route.component === "ChildView") {
				route.component = ChildView;
			} else {
				route.component = asyncLoadView(route.component);
			}
		}
		// 是否包含子元素
		if (route?.children?.length) {
			route.children = filterAsyncRouter(route.children);
		} else {
			delete route["children"];
			delete route["redirect"];
		}
		return true;
	});
};
