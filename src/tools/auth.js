import Cookies from "js-cookie";
//  默认 Key
const TokenKey = "JWT";

// 设置 Token
export const setToken = (token, key = TokenKey) => {
	Cookies.set(key, token);
};

// 获取 Token
export const getToken = (key = TokenKey) => {
	return Cookies.get(key) || null;
};

// 移除 Token
export const removeToken = () => {
	const JWTKeys = Object.keys(Cookies.get());
	JWTKeys.forEach(key => Cookies.remove(key));
	sessionStorage.clear();
	localStorage.clear();
};
