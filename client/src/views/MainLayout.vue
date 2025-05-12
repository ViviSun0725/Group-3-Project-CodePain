<script setup>
import MainHeader from "../components/MainHeader.vue";
import MainFooter from "../components/MainFooter.vue";
import MainSidebar from "../components/MainSidebar.vue";
</script>

<template>
  <MainSidebar />
  <MainHeader />
  <RouterView />
  <MainFooter />
</template>
