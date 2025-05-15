<script setup>
	import { ref } from 'vue';
  import Icon from '../assets/icon.svg';
  import Edit from '../assets/edit.svg';
  import Like from '../assets/like.svg';
  import Cloud from '../assets/cloud.svg';
  import Arrow from '../assets/arrow.svg';
  import Settings from '../assets/settings.svg';
  import Layout from '../assets/layout.svg';
  import Bookmark from '../assets/bookmark.svg';

	const isLoggedIn = ref(true)
</script>
<template>
  <nav class="relative h-[65px] w-full bg-black flex items-center justify-between">
    <div class="flex items-center ml-2">
      <a href="/" class="flex text-0">
        <img :src="Icon" alt="" class=" w-[35px] mb-[10px] ml-[3px] " >
      </a>
      <div class="text-white ml-2">
        <div class="flex items-center">
          <span>Title</span>
          <button type="button" class="ml-1">
            <img :src="Edit" alt="" class="w-[13px] h-[13px]">
          </button>
        </div>
        <a href="#" class="text-sm">Barry</a>
      </div>
    </div>

    <div class="bg-azure flex items-center px-2">
      <button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded px-5 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex">
          <img :src="Like" alt="" class="w-[16px]">
        </div>
      </button>

      <button type="button" class="text-[aliceblue] rounded-l px-5 py-2 bg-[#444857] mr-[1px]" :class="{'rounded mr-[10px]' : !isLoggedIn}">
        <div class="h-7 flex items-center gap-1">
          <img :src="Cloud" alt=""  class="w-[16px]">
          <span>Save</span>
        </div>
      </button>
      <button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded-r  py-2 bg-[#444857] flex justify-center items-center w-[20px] mr-[10px]">
        <div class="h-7 flex justify-center items-center">
          <img :src="Arrow" alt=""  class="w-[10px]">
        </div>
      </button>

      <button type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
          <img :src="Settings" alt=""  class="w-[16px]">
				<span>Settings</span>
			</div>
		</button>
      <button type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
          <img :src="Layout" alt="" class="w-[14px]">
			</div>
		</button>
		 <button v-if="isLoggedIn"  type="button" class="text-[aliceblue] rounded-l px-4 py-2 bg-[#444857] mr-[1px]">
        <div class="h-7 flex items-center gap-1">
          <img :src="Bookmark" alt="" class="w-[12px]">
				</div>
		</button>
		<button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded-r py-2 bg-[#444857] flex justify-center items-center w-[20px] mr-[5px]">
			<div class="h-7 flex justify-center items-center">
        <img :src="Arrow" alt=""  class="w-[10px]">
			</div>
		</button>

			<button v-if="!isLoggedIn" type="button" class="text-black rounded px-4 py-2 bg-[#47cf73] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
					<span>Sign Up</span>
			</div>
		</button>
			<button v-if="!isLoggedIn" type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
					<span>Log In</span>
			</div>
		</button>

      <div v-if="isLoggedIn" class="w-[44px] h-[44px] overflow-hidden mx-1 rounded">
        <img src="https://fakeimg.pl/300x200/500" class="w-full h-full object-cover" />
      </div>
    </div>
  </nav>
</template>