import { defineStore } from "pinia";

export const useUserStore = defineStore({
	state: () => ({
		username: "",
		password: ""
	}),
	getters: {
		name(state) {}
	},
	actions: {
		updateName(text) {
			this.name = text;
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
