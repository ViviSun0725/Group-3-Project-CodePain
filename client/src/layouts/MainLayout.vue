<template>
	<div class="layout">
		<MainSidebar class="sidebar" />
		<SubHeader class="header" />
		<RouterView v-slot="{ Component }">
			<component :is="Component" class="content" />
		</RouterView>
		<SubFooter class="footer" />
	</div>
	<!--routerview 內容一定要寫在div class="content"裡面!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 不然會跑掉-->
</template>

<script setup>
import SubHeader from "../components/SubHeader.vue";
import SubFooter from "@/components/SubFooter.vue";
import MainSidebar from "../components/MainSidebar.vue";
</script>

<style scoped>
.layout {
	display: grid;
	grid-template-areas:
		"sidebar header"
		"sidebar content"
		"sidebar footer";
	grid-template-columns: 1px 1fr;
	grid-template-rows: 75px 1fr 75px;
	height: 100vh;
}

.sidebar {
	grid-area: sidebar;
}

.header {
	grid-area: header;
}

.content {
	grid-area: content;
}

.footer {
	grid-area: footer;
}
</style>
