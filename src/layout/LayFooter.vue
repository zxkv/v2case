<template>
	<el-footer height="32px">
		<center>
			<span>Copyright &copy;{{ year }} Create By&nbsp;</span>
			<el-link href="https://zxkv.github.io" :underline="false" target="_blank">下落香樟树</el-link>
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
