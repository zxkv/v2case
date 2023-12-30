<template>
	<el-footer height="32px">
		<center>
			<span>&copy;{{ year }} create by&nbsp;</span>
			<!-- target="_blank" -->
			<el-link href="https://zxkv.github.io" :underline="false">下落香樟树</el-link>
		</center>
	</el-footer>
</template>

<script>
export default {
	name: "LayFooter",
	data() {
		return {
			year: new Date().getFullYear()
		};
	}
};
</script>
