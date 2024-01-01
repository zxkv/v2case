/**方法一：
 * @description 获取地址栏参数
 * @param {string} key 参数名
 * @return {string} 参数值
 **/
export const queryParams = key => {
	if (!key) return null;
	let url = new URL(location.href);
	let value = url.searchParams.get(key);
	return value;
};

/**方法二：
 * @description 获取地址栏参数
 * @param {String} key 要取值的参数
 * @return {String} 获取的值
 **/
export const getQueryString = name => {
	let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let r = window.location.search.substring(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
};

/**
 * @description 文本拷贝
 * @param {String} text 参数
 **/
export const copyURL = text => {
	const input = document.createElement("input");
	input.setAttribute("value", text);
	document.body.appendChild(input);
	input.select();
	if (document.execCommand("copy")) {
		document.execCommand("copy");
	}
	input.remove();
};

/**
 * @description 文件大小计算
 * @param {String} size 文件大小
 * @return {String} 展示文本 x.xGB、x.xMB、x.xKB、x.xB
 **/
export const turnFileSize = (size = 0) => {
	if (size == 0 || size == null) return null;
	if (size > 1073741824) return (size / 1073741824).toFixed(3) + "GB";
	if (size > 1048576) return (size / 1048576).toFixed(3) + "MB";
	else if (size > 1024) return (size / 1024).toFixed(3) + "KB";
	else return size + "B";
};

/**
 * @description GET 参数处理
 * @param {Object} params  参数集合
 */
export const tansParams = params => {
	let result = "";
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		let part = encodeURIComponent(propName) + "=";
		if (value !== null && value !== "" && typeof value !== "undefined") {
			if (typeof value === "object") {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof value[key] !== "undefined") {
						let params = propName + "[" + key + "]";
						let subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result;
};

/**
 * @description 动态更新网站标题
 * @param {Object} msg
 * @param {Boolean} isLogin 登录/退出
 **/
export const updateWebInfo = (msg, isLogin = true) => {
	// 网站标题
	const webTitle = process.env.VUE_APP_TITLE || "v2case";
	// 网站站标
	const webIcon = location.origin + "/favicon.ico";
	// 站标标签
	const iconTag = document.querySelector("link[rel*='icon']");
	if (isLogin) {
		let { title, icon } = msg;
		document.title = title ? title : webTitle;
		iconTag.href = icon ? icon : webIcon;
	} else {
		document.title = webTitle;
		iconTag.href = webIcon;
	}
};
