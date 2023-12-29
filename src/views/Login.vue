<template>
	<div class="app-login">
		<el-card shadow="hover" class="al-card">
			<div slot="header">系统登录</div>
			<el-form ref="loginForm" :model="loginForm" :rules="rules">
				<el-form-item prop="username">
					<el-input
						v-model.trim="loginForm.username"
						prefix-icon="el-icon-user"
						:maxlength="32"
						placeholder="账号"
						clearable
					></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input
						v-model.trim="loginForm.password"
						prefix-icon="el-icon-lock"
						:maxlength="32"
						placeholder="密码"
						show-password
						clearable
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button class="al-btn" type="primary" plain :loading="loading" @click="handleLogin">登 录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "@/store/user";

export default {
	name: "Login",
	data() {
		return {
			loading: false,
			loginForm: {
				username: "admin",
				password: "123456"
			},
			rules: {
				username: [{ required: true, message: "请输入账号", trigger: "blur" }],
				password: [{ required: true, message: "请输入密码", trigger: "blur" }]
			}
		};
	},
	methods: {
		...mapActions(useUserStore, ["setName"]),
		handleLogin() {
			this.$refs["loginForm"].validate(valid => {
				if (!valid) return false;
				this.loading = true;
				let { username, password } = this.loginForm;
				if (["admin", "user"].includes(username) && password === "123456") {
					this.setName({ username, password });
					this.$router.replace("/");
					this.$message.success("登录成功");
				} else {
					this.$message.error("账号或密码错误");
				}
				this.loading = false;
			});
		}
	}
};
</script>

<style lang="scss">
.app-login {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	background: url("../assets/img/login.webp") top center no-repeat;
	background-size: cover;

	.al-card {
		width: 360px;

		.al-btn {
			width: 100%;
		}
	}
}
</style>
