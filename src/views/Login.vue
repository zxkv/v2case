<template>
	<div class="app-login">
		<el-card shadow="hover" class="al-card">
			<div slot="header">
				<span>系统登录</span>
				<span class="al-back" @click="handleBack">返回</span>
			</div>
			<el-form ref="loginForm" :model="loginForm" :rules="rules" @submit.native.prevent="handleLogin">
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
					<el-button class="al-btn" type="primary" :loading="loading" native-type="submit">登 录</el-button>
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
					this.$message.success("登录成功");
					this.loading = false;
					this.$router.replace("/");
				} else {
					this.loading = false;
					this.$message.error("账号或密码错误");
				}
			});
		},
		handleBack() {
			location.replace("./");
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

		.al-back {
			float: right;
			font-size: 14px;
			color: #409eff;
			cursor: pointer;
		}
		.al-btn {
			width: 100%;
		}
	}
}
</style>
