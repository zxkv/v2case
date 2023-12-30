<template>
	<el-container class="app-layout">
		<el-header class="app-header" height="49px">
			<LayHeader />
		</el-header>
		<el-container>
			<LayMenu />
			<el-main class="app-main">
				<LayMain :class="{ mmh: hasFooter }" />
				<LayFooter v-if="hasFooter" />
				<!-- Back Top -->
				<el-backtop target=".app-main" :right="24" :bottom="16"></el-backtop>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import LayMenu from "./LayMenu.vue";
import LayHeader from "./LayHeader.vue";
import LayMain from "./LayMain.vue";
import LayFooter from "./LayFooter.vue";

export default {
	name: "Layout",
	components: { LayMenu, LayHeader, LayMain, LayFooter },
	data() {
		return {
			hasFooter: true
		};
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
		border-bottom: 1px solid #e6e6e6;
	}
	.app-main {
		padding: 10px;
		height: calc(100vh - 50px);
		background-color: #fafafa;
		overflow: hidden;
		overflow-y: overlay;
		.mmh {
			min-height: calc(100% - 32px);
		}
	}
}
</style>
