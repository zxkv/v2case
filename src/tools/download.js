import JsZip from "jszip";
import { saveAs } from "file-saver";

/**方法一
 * @description 下载文件
 * @param {String} 文件下载地址
 **/
export const downloadFile = fileURL => {
	// 创建 iframe 标签
	const iframe = document.createElement("iframe");
	// 防止影响页面
	iframe.style.display = "none";
	// 防止影响页面
	iframe.style.height = 0;
	iframe.src = fileURL;
	document.body.appendChild(iframe);
	// 加载完成移除标签
	iframe.onload = function () {
		document.body.removeAttribute(iframe);
	};
};

/**方法二
 * @description 导出文件
 * @param {String} link 要导出的文件地址
 * @param {String} name 要导出的文件名字
 **/
export const saveFile = (link, name) => {
	return new Promise(resolve => {
		saveAs(link, name);
		resolve();
	});
};

/**方法三
 * @description 单文件下载
 * @param {Object|Array} file 要下载的文件对象
 * @use 使用方法 singleDownload.call(this,参数1,参数2...)
 **/
export const singleDownload = (file = null) => {
	if (!file) return;
	const hasArray = Array.isArray(file);
};
