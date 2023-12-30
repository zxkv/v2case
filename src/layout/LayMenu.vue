<template>
	<el-aside width="200px" class="app-aside">
		<el-menu class="app-menu" :collapse="collapse" :default-active="$route.path" unique-opened router>
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
			collapse: false
		};
	},
	computed: {
		...mapState(useUserStore, ["menuList"])
	},
	methods: {
		concatPath(item, sub) {
			return sub.path ? item.path + "/" + sub.path : item.path;
		}
	}
};
</script>

<style lang="scss">
.app-aside {
	padding-top: 1px;

	.app-menu {
		height: calc(100vh - 50px);
		overflow: hidden;
		overflow-y: overlay;
	}
}
</style>
