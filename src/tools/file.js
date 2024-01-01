import MP4Box from "mp4box";

/**
 * @description 获取音/视频时长
 * @param {String/Object} 文件地址或文件对象
 * @return {Number} 媒体文件时长
 **/
export const getMediaDuration = file => {
	return new Promise(resolve => {
		const hasURL = typeof file === "string";
		// 获取文件地址
		let fileURL = hasURL ? file : URL.createObjectURL(file);
		// 创建 Audio 对象
		let audioElement = new Audio(fileURL);
		// 监听 Audio 时间
		audioElement.addEventListener("loadedmetadata", () => {
			let time = Math.floor(audioElement.duration) || 0;
			resolve(time);
		});
		// 监听加载失败
		audioElement.addEventListener("error", () => {
			resolve(0);
		});
	});
};

/**
 * @description 获取图片宽度和高度
 * @param {String/Object} 图片地址或文件对象
 * @return {Object} S:面积，W:宽度，H:高度
 **/
export const getImgWH = file => {
	return new Promise(resolve => {
		const FR = new FileReader();
		FR.onload = e => {
			let imgData = e.target.result;
			let img = new Image();
			img.src = imgData;
			img.onload = () => {
				let iW = img.width || 0;
				let iH = img.height || 0;
				let area = { S: iW * iH, W: iW, H: iH };
				return resolve(area);
			};
			img.onerror = () => resolve({ S: 0, W: 0, H: 0 });
		};
		FR.readAsDataURL(file);
	});
};

/**
 * @description 检测音/视频文件是否符合要求
 * @param {Object} file 文件对象
 * @return {Boolean} true 不符合 false 符合
 **/

export const checkMediaFile = file => {
	return new Promise(resolve => {
		// 音视频文件检测
		if (!["audio/mpeg", "audio/wav", "video/mp4"].includes(file.type)) return resolve(true);
		// 检测视频
		if (file.type === "video/mp4") {
			const mp4boxFile = MP4Box.createFile();
			// 创建文件对象
			const mediaFile = new FileReader();
			// 加载媒体文件
			mp4boxFile.onReady = info => {
				const MIME = info?.mime ?? null;
				let flag = true;
				if (MIME) {
					// 部分浏览器不支持 h265 码率的视频播放
					const H265 = ["hev1", "hvc1", "hevc"];
					const H264 = ["avc1", "avc2", "avc3", "mp4a"];
					const haveH265 = H265.some(v => MIME.includes(v));
					const haveH264 = H264.some(v => MIME.includes(v));
					flag = haveH265 || !haveH264;
				}
				// 打印视频文件 MIME
				console.log(`VIDEO_MIME:%c${MIME}`, "color:red");
				resolve(flag);
			};
			// 读取媒体文件流
			mediaFile.readAsArrayBuffer(file);
			// 媒体文件加载完成
			mediaFile.addEventListener("loadend", evt => {
				let stream = evt.target.result;
				stream.fileStart = 0;
				mp4boxFile.appendBuffer(stream);
				mp4boxFile.flush();
				resolve(true);
			});
		} else {
			// 转换音频文件地址
			const fileURL = URL.createObjectURL(file);
			// 创建音频实例
			const audioElement = new Audio(fileURL);
			// 音频加载播放
			audioElement.addEventListener("canplaythrough", evt => {
				console.log("音频加载播放", evt);
				resolve(false);
			});
			// 音频加载失败
			audioElement.addEventListener("error", err => {
				console.log("音频加载失败", err);
				resolve(true);
			});
		}
	});
};
