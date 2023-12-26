<template>
	<div class="app-home">
		<el-card shadow="never" :body-style="{ padding: '10px' }">
			<div slot="header">HOME PAGE</div>
			<h1>APP HOME</h1>
			<el-button type="danger" @click="handleLogout">退出</el-button>
		</el-card>
	</div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "@/store/user";

export default {
	name: "Home",
	data() {
		return {
			key: ""
		};
	},
	methods: {
		...mapActions(useUserStore, ["logout"]),
		handleLogout() {
			this.$confirm("此操作将退出当前账号，是否退出？", "退出提示", {
				confirmButtonText: "退出",
				type: "error"
			})
				.then(() => {
					this.logout();
					this.$router.replace({ name: "Login", path: "/login" });
				})
				.catch(() => {});
		}
	}
};
</script>

<style lang="scss" scoped>
.app-home {
	height: 100vh;
}
</style>
