<template>
  <div class="content flex flex-row mt-3 border-t-3 border-t-[#2C303A]">
    <div
      class="bg-[#131417] text-white pt-4 w-[180px] border-r-3 border-r-[#2C303A] h-full"
    >
      <h2 class="text-xl font-bold mb-3 px-3">Settings</h2>
      <nav>
        <ul class="text-gray-400 text-lg">
          <li
            class="cursor-pointer p-1 pl-5 transition-all hover:bg-[#2C303A] hover:border-l-4 hover:border-[#05DF72] hover:text-white"
            :class="
              route.path === '/settings/profile'
                ? 'bg-[#2C303A] border-l-4 border-[#05DF72] text-white'
                : ''
            "
            @click="profile"
          >
            Profile
          </li>
          <li
            class="cursor-pointer p-1 pl-5 transition-all hover:bg-[#2C303A] hover:border-l-4 hover:border-[#05DF72] hover:text-white"
            :class="
              route.path === '/settings/account'
                ? 'bg-[#2C303A] border-l-4 border-[#05DF72] text-white'
                : ''
            "
            @click="account"
          >
            Account
          </li>
        </ul>
      </nav>
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const profile = () => {
  router.push("/settings/profile");
};
const account = () => {
  router.push("/settings/account");
};
</script>

<style scoped></style>
