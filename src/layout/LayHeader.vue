<template>
	<div class="lay-header">
		<div class="lh-left">
			<div class="logo">
				<img src="@/assets/img/logo.png" draggable="false" />
			</div>
			<div class="logo-title">Vue2 Case Admin</div>
		</div>
		<div class="lh-right">
			<el-dropdown class="lr-user" @command="handleCommand">
				<div class="lr-user-wrap">
					<el-avatar :src="avatar" :size="32"></el-avatar>
					<span class="lr-uname">admin</span>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item icon="el-icon-user" command="/user">个人中心</el-dropdown-item>
					<el-dropdown-item icon="el-icon-switch-button" command="/login">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "@/store/user";
import avatar from "@/assets/img/avatar.png";

export default {
	name: "LayHeader",
	data() {
		return {
			avatar
		};
	},
	methods: {
		...mapActions(useUserStore, ["logout"]),
		handleCommand(cmd) {
			if (cmd === "/login") {
				this.$confirm("此操作将退出当前账号，是否退出？", "退出提示", {
					confirmButtonText: "退出",
					type: "error"
				})
					.then(() => {
						this.logout();
						this.$router.replace({ path: "/login" });
					})
					.catch(() => {});
			} else {
				console.log("1");
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.lay-header {
	height: 100%;
	display: flex;
	align-items: stretch;
	justify-content: space-between;
	user-select: none;

	.lh-left {
		padding-left: 10px;
		display: flex;
		align-items: center;
		.logo {
			padding-right: 10px;
			vertical-align: middle;
			img {
				height: 40px;
				min-width: 40px;
			}
		}

		.logo-title {
			font-size: 24px;
		}
	}

	.lh-right {
		padding-right: 10px;
		.lr-user {
			height: 100%;
		}
		.lr-user-wrap {
			height: 100%;
			display: flex;
			align-items: center;
			cursor: pointer;
			span.lr-uname {
				padding: 0 10px;
				font-size: 16px;
			}
		}
	}
}
</style>
