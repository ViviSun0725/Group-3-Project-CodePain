<template>
	<div class="layout" :style="{ gridTemplateColumns: layoutColumns }">
		<MainSidebar class="sidebar" @toggle="toggleSidebar" />
		<SubHeader class="header" />
		<RouterView v-slot="{ Component }">
			<component :is="Component" class="content" />
		</RouterView>
		<SubFooter class="footer" />
	</div>
	<!--routerview 內容一定要寫在div class="content"裡面!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 不然會跑掉-->
</template>

<script setup>
import { computed, ref } from "vue";

import SubHeader from "../components/SubHeader.vue";
import SubFooter from "@/components/SubFooter.vue";
import MainSidebar from "../components/MainSidebar.vue";

const isSidebarOpen = ref(true); //預設值是true=打開
const layoutColumns = computed(() =>
	isSidebarOpen.value ? "160px 1fr" : "0px 1fr"
);

function toggleSidebar() {
	//切換true or false
	isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
.layout {
	display: grid;
	grid-template-areas:
		"sidebar header"
		"sidebar content"
		"sidebar footer";
	grid-template-rows: 75px 1fr 75px; /* 先寫死表示大概畫面 再自行修正*/
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
