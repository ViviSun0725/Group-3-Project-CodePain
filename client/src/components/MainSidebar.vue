<template>
  <div>
    <header
      class="relative top-0 left-0 h-screen transition-all duration-300 bg-[#1E1F26] text-amber-50"
      :class="{ 'w-[140px]': isSidebarOpen, 'w-0': !isSidebarOpen }"
    >
      <div class="absolute top-4 -right-4 z-10">
        <button
          @click="toggleSidebar"
          class="flex items-center justify-center w-4 h-7 bg-[#5A5F73] text-amber-50 rounded-r cursor-pointer transition-all duration-300"
        >
          <span :class="{ 'rotate-180': isSidebarOpen }">➤</span>
        </button>
        <div
          @click="toggleSidebar"
          class="inner-sidebar absolute w-3 right-[5px] -top-[15px] h-screen opacity-25 -z-10 cursor-pointer bg-[repeating-linear-gradient(45deg,hsl(226.15deg,12.04%,57.65%),hsl(226.15deg,12.04%,57.65%)_2px,hsl(228deg,12.2%,40.2%)_0,hsl(228deg,12.2%,40.2%)_4px)] hover:opacity-50 hover:transition-opacity hover:duration-700 hover:ease-in-out text-zinc-950"
          :class="{ hidden: isSidebarOpen }"
        ></div>
      </div>

      <div
        class="h-full overflow-y-auto overflow-x-hidden"
        :class="{ hidden: !isSidebarOpen }"
      >
        <div class="p-5">
          <h1>CODEPAIN</h1>
        </div>
        <nav>
          <div>
            <h2></h2>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <div>Your Work</div>
          </div>
          <div>
            <div>Following</div>
            <div>trending</div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
.inner-sidebar:hover {
  animation: fadeOut 0.5s ease-in-out infinite;
}
@keyframes fadeOut {
  0% {
    top: -15px;
  }
  100% {
    top: -30px;
  }
}
</style>
