import JsZip from "jszip";
import { saveAs } from "file-saver";
import { Message, Loading } from "element-ui";

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

/**
 * @description 单文件下载
 * @param {Object|Array} file 要下载的文件对象
 * @use 使用方法 singleDownload.call(this,参数1,参数2...)
 **/
export const singleDownload = (file = null) => {
	if (!file) return;
	const hasArray = Array.isArray(file);
};

/**
 * @description 文件批量下载
 * @param {Array} files 要下载的文件对象信息集合
 * @use 使用方法 batchDownload.call(this,参数1,参数2...)
 **/
export const batchDownload = async function (files = []) {
	// 开启加载弹窗
	const load = Loading();
	try {
		// 处理message提示叠加问题
		let msgPromise = Promise.resolve();
		let $message = msg => {
			msgPromise = msgPromise.then(() => Message.error(msg));
		};
		// 循环下载文件
		for (let item of files) {
			let hasURL = item.fileUrl || null;
			if (hasURL) {
				downloadFile(hasURL);
			} else {
				$message("文件xx: 下载失败");
			}
		}
	} finally {
		// 关闭加载弹窗
		load.close();
	}
};

/**
 * @description 文件压缩下载
 * @param {Array} files 要下载的文件对象信息集合
 * @param {String} zipName 压缩文件名（不带后缀名）
 * @param {String} suffix 文件后缀名
 **/
export const zipDownload = async (files = [], zipName = "压缩文件", suffix = "xlsx") => {
	// 解析处理文件流
	const FileToBuffer = URL => {
		return new Promise((resolve, reject) => {
			const FB = fetch(URL).then(response => response.arrayBuffer());
			FB.then(buffer => resolve(buffer)).catch(err => reject(err.toString()));
		});
	};
	// 创建zip实例
	const zip = new JsZip();
	// 创建文件
	const all = files.map(f => FileToBuffer(f.fileUrl).then(bf => zip.file(`${f.fileName}.${f.suffixName || suffix}`, bf)));
	// 异步处理
	await Promise.all(all);
	// 生成二进制文件流
	await zip.generateAsync({ type: "blob" }).then(fs => saveAs(fs, zipName + ".zip"));
};
