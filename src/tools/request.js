import axios from "axios";
import router from "@/router";
import { Message } from "element-ui";
import { getToken, removeToken } from "@/utils/auth";
import { tansParams } from "@/utils/tool";

const errorCode = {
	401: "认证失败，无法访问系统资源",
	403: "当前操作无权限",
	404: "访问资源不存在",
	999: "登录信息已过期，请重新登录",
	default: "系统未知错误，请反馈给管理员"
};

const logOut = () => {
	const loginPath = getToken("obr_login");
	removeToken();
	router.replace(loginPath);
};

const instance = axios.create({
	baseURL: import.meta.env.VITE_APP_API,
	timeout: 300000
});

// request拦截器
instance.interceptors.request.use(
	config => {
		// 是否需要设置 token
		const isToken = (config.headers || {}).isToken === false;
		if (getToken() && !isToken) {
			config.headers["X-Access-Token"] = getToken();
			// 全局参数
			const params = null;
			if (params && ["get", "post", "delete"].includes(config.method)) {
				const hasKey = Object.prototype.hasOwnProperty.call(config, "params");
				hasKey ? Object.assign(config.params, params) : Object.assign(config, { params });
			}
		}
		// get请求映射params参数
		if (config.method === "get" && config.params) {
			let url = config.url + "?" + tansParams(config.params);
			url = url.slice(0, -1);
			config.params = {};
			config.url = url;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// response拦截器
instance.interceptors.response.use(
	res => {
		const code = res.data.code || 200;
		const msg = res.data.message || errorCode[code] || errorCode["default"];
		// 二进制数据则直接返回
		if (res.request.responseType === "blob" || res.request.responseType === "arraybuffer") return res.data;
		if (code === 10000) return Promise.reject(msg);
		// token信息失效
		if (code === 500) {
			Message.error(msg);
			return Promise.reject(new Error(msg));
		} else if (code !== 200) {
			Message.error(msg);
			return Promise.reject(new Error(msg));
		} else {
			return res.data;
		}
	},
	error => {
		let { config, message, response, request, code } = error;
		if (code === "ERR_NETWORK") message = "网络连接异常，请求发送失败";
		if (message.includes("timeout")) message = "系统接口请求超时";
		else if (response?.status === 401 || request?.status === 401) {
			message = errorCode["999"];
			logOut();
		}
		Message.error(message);
		return Promise.reject(error);
	}
);

export default instance;
