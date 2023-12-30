import { defineStore } from "pinia";
import { asyncRouters } from "@/router/router";

export const useUserStore = defineStore("user", {
	state: () => ({
		username: "",
		password: "",
		role: null /* 0：admin、1：user */,
		menuList: []
	}),
	getters: {
		getRole: state => state.role
	},
	actions: {
		setName(item) {
			let { username, password } = item;
			this.username = username;
			this.password = password;
			this.role = username === "admin" ? 0 : 1;
			// 更新菜单
			this.setMenu(asyncRouters);
		},
		setMenu(list = []) {
			if (this.menuList.length) this.menuList.splice();
			this.menuList = [...list];
		},
		logout() {
			this.username = "";
			this.password = "";
			this.role = null;
			this.menuList.splice();
		}
	},
	/**
	 * 数据持久化
	 * 方式一
	 * @param {Boolean} persist true/false
	 * 方式二
	 * @param {Object} persist {}
	 * @param {String} key
	 * @param {StorageLike} storage sessionStorage/localStorage
	 * @param {String} paths ['username']
	 * @param {Serializer} serializer
	 **/
	persist: true
});
