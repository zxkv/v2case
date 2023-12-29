<template>
	<div class="app-error">
		<div class="ae-center">
			<img src="../assets/img/error.webp" draggable="false" />
			<p>您访问的页面不存在</p>
			<router-link to="/">
				<el-button type="primary" plain>返回首页</el-button>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: "Error"
};
</script>

<style lang="scss">
.app-error {
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: space-around;

	.ae-center {
		font-size: 18px;
		font-weight: bold;
		text-align: center;
	}
}
</style>
