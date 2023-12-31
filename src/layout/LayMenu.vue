<template>
	<el-aside width="200px" class="app-aside">
		<div class="app-logo">
			<img src="@/assets/img/logo.png" draggable="false" />
			<div class="logo-title">v2case</div>
		</div>
		<el-menu
			class="app-menu"
			:collapse="isCollapse"
			:default-active="$route.path"
			background-color="#001529"
			active-text-color="#fff"
			text-color="#fff2f0"
			unique-opened
			router
		>
			<template v-for="item in menuList">
				<!-- 独立菜单 -->
				<el-menu-item v-if="item.leaf" :index="item.path" :key="item.path">
					<i v-if="item.meta?.icon" :class="item.meta.icon"></i>
					<span>{{ item.meta.title }}</span>
				</el-menu-item>
				<!-- 折叠菜单 -->
				<el-submenu v-else :index="item.path" :key="item.path">
					<template slot="title">
						<i v-if="item.meta?.icon" :class="item.meta.icon"></i>
						<span>{{ item.meta.title }}</span>
					</template>
					<el-menu-item v-for="sub in item.children" :index="concatPath(item, sub)" :key="concatPath(item, sub)">
						{{ sub.meta.title }}
					</el-menu-item>
				</el-submenu>
			</template>
		</el-menu>
	</el-aside>
</template>

<script>
import { mapState } from "pinia";
import { useUserStore } from "@/store/user";

export default {
	name: "LayMenu",
	data() {
		return {
			isCollapse: false
		};
	},
	computed: {
		...mapState(useUserStore, ["menuList"])
	},
	methods: {
		concatPath(item, sub) {
			return sub.path ? item.path + "/" + sub.path : item.path;
		},
		changeCollapse() {
			this.isCollapse = !this.isCollapse;
		}
	}
};
</script>

<style lang="scss">
.app-aside {
	height: 100vh;
	background-color: #001529;
	.app-logo {
		padding: 0 16px;
		height: 48px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		color: #fff;

		& > img {
			width: 40px;
			height: 40px;
		}

		.logo-title {
			margin-left: 8px;
			max-width: 120px;
			font-size: 20px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}

	.app-menu {
		border-right: none;
		height: calc(100vh - 48px);
		overflow: hidden;
		overflow-y: overlay;
		// 选中颜色
		.el-menu-item.is-active {
			background-color: #165dff !important;
		}
	}
}
</style>
