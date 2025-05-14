<script setup>
	import { ref } from 'vue';

	const isLoggedIn = ref(false)
</script>
<template>
  <nav class="relative h-[65px] w-full bg-black flex items-center justify-between">
    <!-- Icon Section -->
    <div class="flex items-center ml-2">
      <a href="/" class="flex text-0">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="fill-white w-[35px] mb-[10px] ml-[3px]">
					<path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3 88 34.8 73 44.9 54.3 32.4zm-8.6 0v20L27.1 44.8 12 34.8zM8.6 42.8 19.3 50 8.6 57.2zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2 34.8 50 50 39.8 65.2 50zm4.3 27.5v-20l18.6-12.5 15 10.1zm37.1-30.5L80.7 50l10.8-7.2z"></path>
        </svg>
      </a>
      <div class="text-white ml-2">
        <div class="flex items-center">
          <span>Title</span>
          <button type="button" class="ml-1">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-[13px] h-[13px] fill-white">
							<path d="M24.56 92.536 0 100l7.453-24.583c6.356-.244 17.322 10.792 17.107 17.119zM96.617 32.082l-.475.471L67.383 3.766l.472-.472c12.927-12.94 42.016 15.517 28.762 28.788zM61.64 9.516l28.758 28.785-46.303 46.345c-1.222 1.221-2.234.884-2.234.884l2.314-15.356-14.454.074.072-14.468-15.342 2.312s-.34-1.011.883-2.234z"></path>
            </svg>
          </button>
        </div>
        <a href="#" class="text-sm">Barry</a>
      </div>
    </div>

    <!-- Button Set -->
    <div class="bg-azure flex items-center px-2">
      <!-- like Button -->
      <button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded px-5 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex">
          <svg viewBox="-2 0 105 92" xmlns="http://www.w3.org/2000/svg" class="w-[14px]">
            <path class="fill-white" d="M85.24 2.67C72.29-3.08 55.75 2.67 50 14.9 44.25 2 27-3.8 14.76 2.67 1.1 9.14-5.37 25 5.42 44.38 13.33 58 27 68.11 50 86.81 73.73 68.11 87.39 58 94.58 44.38c10.79-18.7 4.32-35.24-9.34-41.71Z"></path>
          </svg>
        </div>
      </button>

      <!-- Save Button -->
      <button type="button" class="text-[aliceblue] rounded-l px-5 py-2 bg-[#444857] mr-[1px]" :class="{'rounded mr-[10px]' : !isLoggedIn}">
        <div class="h-7 flex items-center gap-1">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-[14px]">
						<path class="fill-white" d="M84.187 44.046c.084-.753.114-1.52.114-2.289 0-13.402-10.814-24.257-24.154-24.257-10.354 0-19.161 6.551-22.599 15.754-2.274-2.508-5.521-4.111-9.166-4.111-6.872 0-12.439 5.59-12.439 12.493 0 .816.084 1.606.239 2.38C7.014 45.534 0 53.472 0 63.095 0 73.824 8.648 82.5 19.323 82.5h61.354C91.351 82.5 100 73.824 100 63.095c0-9.505-6.823-17.38-15.813-19.049z"></path>
          </svg>
          <span>Save</span>
        </div>
      </button>
      <!-- Down Arrow -->
      <button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded-r px-3 py-2 bg-[#444857] flex justify-center items-center w-[14px] mr-[10px]">
        <div class="h-7 flex justify-center items-center">
          <svg viewBox="-122.9 121.1 105.9 61.9" xmlns="http://www.w3.org/2000/svg" class="w-[10px]">
						<path class="fill-[#868CA0]" d="m-63.2 180.3 43.5-43.5c1.7-1.7 2.7-4 2.7-6.5s-1-4.8-2.7-6.5-4-2.7-6.5-2.7-4.8 1-6.5 2.7L-69.9 161l-37.2-37.2c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.6c-1.9 1.8-2.8 4.2-2.8 6.6 0 2.3.9 4.6 2.6 6.5 11.4 11.5 41 41.2 43 43.3l.2.2c3.6 3.6 10.3 3.6 13.9 0z"></path>
          </svg>
        </div>
      </button>

			<!-- settings button -->
      <button type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="w-[14px]">
						<path class="fill-white" d="M87.687 45.077c-.313-2.433-.816-4.807-1.542-7.079l8.145-11.73-5.827-7.515-.094-.123-5.824-7.514-12.955 5.577c-2.041-1.265-4.192-2.362-6.459-3.219L59.42 0H40.586l-3.709 13.474c-2.27.857-4.421 1.955-6.463 3.222l-12.957-5.577-5.825 7.514-.097.124-5.822 7.517 8.146 11.731a39.832 39.832 0 0 0-1.544 7.079L0 52.032l2.08 9.375.033.15 2.08 9.375 14.001.761a39.157 39.157 0 0 0 4.4 5.668l-2.396 14.227 8.416 4.173.138.067L37.169 100l9.309-10.796c1.161.109 2.335.173 3.524.173s2.358-.074 3.52-.184l9.317 10.804 8.415-4.173.141-.066 8.413-4.172-2.396-14.228a39.06 39.06 0 0 0 4.4-5.672l14-.759 2.078-9.375.035-.154L100 52.025zM50.003 34.51c8.435 0 15.272 7.035 15.272 15.719 0 8.679-6.839 15.717-15.272 15.717-8.436 0-15.272-7.038-15.272-15.717 0-8.684 6.838-15.719 15.272-15.719z"></path>
				</svg>
				<span>Settings</span>
			</div>
		</button>
		<!-- 排版button -->
      <button type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="w-[14px]">
						<path class="fill-white" d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 0 1 6 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 0 1 0 5.997zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0 1 13 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 0 1 7 5.997zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0 1 20 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0 1 14 5.997z"></path>
				</svg>
			</div>
		</button>
		<!-- bookmark btn -->
		 <button v-if="isLoggedIn"  type="button" class="text-[aliceblue] rounded-l px-4 py-2 bg-[#444857] mr-[1px]">
        <div class="h-7 flex items-center gap-1">
          <svg viewBox="0 0 14 18" xmlns="http://www.w3.org/2000/svg" class="w-[14px]">
						<path class="fill-white" d="M0 1.8C0 .81.78 0 1.75 0h10.5C13.22 0 14 .81 14 1.8v15.3c0 .34-.18.65-.47.8-.29.15-.64.13-.91-.07L7 13.7l-5.62 4.13c-.27.2-.62.22-.91.07a.893.893 0 0 1-.47-.8V1.8Z" data-name="Layer 1"></path>
					</svg>
				</div>
		</button>
		<button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded-r px-3 py-2 bg-[#444857] flex justify-center items-center w-[14px] mr-[5px]">
			<div class="h-7 flex justify-center items-center">
				<svg viewBox="-122.9 121.1 105.9 61.9" xmlns="http://www.w3.org/2000/svg" class="w-[10px]">
					<path class="fill-[#868CA0]" d="m-63.2 180.3 43.5-43.5c1.7-1.7 2.7-4 2.7-6.5s-1-4.8-2.7-6.5-4-2.7-6.5-2.7-4.8 1-6.5 2.7L-69.9 161l-37.2-37.2c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.6c-1.9 1.8-2.8 4.2-2.8 6.6 0 2.3.9 4.6 2.6 6.5 11.4 11.5 41 41.2 43 43.3l.2.2c3.6 3.6 10.3 3.6 13.9 0z"></path>
				</svg>
			</div>
		</button>

			<!-- sign up btn -->
			<button v-if="!isLoggedIn" type="button" class="text-black rounded px-4 py-2 bg-[#47cf73] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
					<span>Sign Up</span>
			</div>
		</button>
			<!-- Login btn -->
			<button v-if="!isLoggedIn" type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] mr-[10px]">
        <div class="h-7 flex items-center gap-1">
					<span>Log In</span>
			</div>
		</button>


      <!-- User Icon -->
      <div v-if="isLoggedIn" class="w-[44px] h-[44px] overflow-hidden mx-1 rounded">
        <img src="https://fakeimg.pl/300x200/500" class="w-full h-full object-cover" />
      </div>
    </div>
  </nav>
</template>