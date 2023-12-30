<template>
	<div>
		<h1 v-for="item in 40" :key="item">{{ item }}</h1>
	</div>
</template>

<script>
export default {
	name: "VCode"
};
</script>

<style lang="scss" scoped></style>
