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
