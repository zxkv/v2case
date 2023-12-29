<template>
	<el-container class="app-layout">
		<LayMenu />
		<el-container>
			<el-header class="app-header" height="48px">
				<LayHeader />
			</el-header>
			<el-main class="app-main">
				<LayMain />
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import LayMenu from "./LayMenu.vue";
import LayHeader from "./LayHeader.vue";
import LayMain from "./LayMain.vue";

export default {
	name: "Layout",
	components: { LayMenu, LayHeader, LayMain },
	data() {
		return {};
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss">
.app-layout {
	box-sizing: border-box;
	width: 100vw;
	min-width: 1280px;
	height: 100vh;
	overflow: hidden;

	.app-header {
		padding: 0;
		box-shadow: 0 0 1px 0 #777;
	}
	.app-main {
		padding: 0;
	}
}
</style>
