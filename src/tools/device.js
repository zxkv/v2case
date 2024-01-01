import dayjs from "dayjs";
import { nanoid } from "nanoid";

/**
 * @description 视频设备检测
 * @returns
 * 0：设备检测成功
 * 1：设备检测失败
 * 2：设备已被禁用
 **/
export const tryDevice = () => {
	return new Promise(resolve => {
		if ((!"mediaDevices") in navigator) return resolve(1);
		// 浏览器是否支持媒体设备
		if (navigator?.mediaDevices?.getUserMedia === undefined) return resolve(1);
		// 检测设备参数
		const constraints = { audio: false, video: true };
		// 获取视频流
		const nmg = navigator.mediaDevices.getUserMedia(constraints);
		// 处理监听回调
		nmg.then(stream => {
			let tracks = stream.getVideoTracks() ?? [];
			setTimeout(() => tracks[0]?.stop(), 10);
			return resolve(0);
		}).catch(err => resolve(err.name === "NotFoundError" ? 1 : 2));
	});
};

/**
 * @description 获取视频流
 * @param {String} videoDom 视频节点
 * @return {Function} callback 回调函数
 **/
export const getVideoStream = (videoDom = null, cb = null) => {
	if (!videoDom) return false;
	// 视频区域
	const videoTag = videoDom;
	const checkType = { audio: false, video: true };
	const nmg = navigator.mediaDevices.getUserMedia(checkType);
	// 拉流播放
	nmg.then(stream => {
		if (stream) {
			// 初始化视频流
			videoTag.srcObject = stream;
			videoTag.onloadedmetadata = () => {
				videoTag.play();
				cb && cb(true, stream);
			};
		}
	}).catch(() => {
		cb && cb(false, null);
	});
};

/**
 * @description 抓拍生成图片
 * @param {Object} item 初始化实例
 * 	@param {Object} videoDom 视频节点
 * 	@param {Object} canvasDom 画布节点
 * 	@param {String} type 文件类型
 * 	@param {Number} width 画布宽度
 * 	@param {Number} height 画布高度
 * @return {Object} 图片文件信息
 **/
export const snapPicture = item => {
	return new Promise(resolve => {
		// 视频流节点
		let videoTag = item?.videoDom ?? null;
		// 画布节点
		let canvasTag = item?.canvasDom ?? null;
		// 判断是否有节点
		if (!videoTag || !canvasTag) return resolve(null);
		// 文件类型判断
		let imgType = item?.type ?? "jpeg";
		let type = imgType.includes("png") ? "image/png" : "image/jpeg";
		// 初始化画布宽度和高度
		let cvsWidth = item?.width ?? 320;
		let cvsHeight = item?.height ?? 240;
		// 创建画布
		let ctx = canvasTag?.getContext("2d");
		// 绘制画布
		ctx?.drawImage(videoTag, 0, 0, cvsWidth, cvsHeight);
		// 生成 base64 图片
		let imgBase64 = canvasTag?.toDataURL(type) ?? null;
		// canvas转blob
		const cvsToBlob = blob => {
			let YMD = dayjs().format("YYYY/MM/DD");
			let imgBlob = blob;
			let imgSrc = URL?.createObjectURL(blob) ?? null;
			let suffixName = type == "image/png" ? "png" : "jpeg";
			let fileName = nanoid();
			let imgPath = `${item.rootPath}/${YMD}/${fileName}.${suffixName}`;
			// 生成文件信息
			const imgInfo = {
				base64: imgBase64,
				blob: imgBlob,
				src: imgSrc,
				path: imgPath,
				// 文件后缀名
				suffixName: suffixName,
				// 文件名（不包含后缀名）
				fileName: fileName
			};
			return resolve(imgInfo);
		};
		// 绘制到画布
		canvasTag?.toBlob(cvsToBlob, type, 1);
	});
};
