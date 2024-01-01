import browser from "browser-tool";
// 获取浏览器设备信息
export const getSysDeviceInfo = async () => {
	const device = await browser();

	let stmpSys = {
		browser: device?.browser || "其它",
		browserVersion: device?.version || "其它",
		device: device?.device || "其它",
		os: device?.system || "其它",
		osVersion: device?.systemVersion || "其它",
		userAgent: device?.userAgent || "其它"
	};
	return stmpSys;
};
