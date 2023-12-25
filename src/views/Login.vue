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
					<el-button class="al-btn" type="primary" plain @click="handleLogin">登 录</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
export default {
	name: "Login",
	data() {
		return {
			loginForm: {
				username: "",
				password: ""
			},
			rules: {
				username: [{ required: true, message: "请输入账号", trigger: "blur" }],
				password: [{ required: true, message: "请输入密码", trigger: "blur" }]
			}
		};
	},
	methods: {
		handleLogin() {
			this.$refs["loginForm"].validate(valid => {
				if (!valid) return false;
				this.$message.success("登录成功");
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
	background: #000 url("../assets/img/login.webp") top center no-repeat;
	background-size: cover;
	&::before {
		content: "";
		width: 100%;
		height: 100%;
		position: absolute;
		backdrop-filter: blur(5px);
	}

	.al-card {
		width: 360px;
		backdrop-filter: blur(0);

		.al-btn {
			width: 100%;
		}
	}
}
</style>
