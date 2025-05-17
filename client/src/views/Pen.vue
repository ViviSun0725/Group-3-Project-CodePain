<script setup>
	import { ref, onMounted, onUnmounted } from 'vue';
  import Icon from '../assets/icon.svg';
  import Edit from '../assets/edit.svg';
  import Like from '../assets/like.svg';
  import Cloud from '../assets/cloud.svg';
  import Arrow from '../assets/arrow.svg';
  import Settings from '../assets/settings.svg';
  import Layout from '../assets/layout.svg';
  import Bookmark from '../assets/bookmark.svg';
  import close from '../assets/close.svg';

  import EditorSmallButton from '../components/Editor/EditorSmallButton.vue';

	const isLoggedIn = ref(true)
  const isConsoleShow = ref(true)
  const isConsoleDragging = ref(false)
  const consoleHeight = ref(200)  // 預設高度 px
  const previewContainer = ref(null)

  const handleConsoleShow = () => {
    isConsoleShow.value = !isConsoleShow.value
  }
  const handleConsoleClose = () => {
    isConsoleShow.value = false;
  }

  const startConsoleDragging = () => {
    isConsoleDragging.value = true
    document.body.classList.add('select-none')
  }

  const stopConsoleDragging = () => {
    if (isConsoleDragging.value) {
      isConsoleDragging.value = false
      document.body.classList.remove('select-none')
    }
  }

  const handleConsoleMouseMove = (e) => {
    if (!isConsoleDragging.value || !previewContainer.value) return;

    const containerHeight = previewContainer.value.clientHeight;
    const rect = previewContainer.value.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const newHeight = containerHeight - offsetY;

    const minHeight = 0;
    const maxHeight = containerHeight;

    if (newHeight >= minHeight && newHeight <= maxHeight) {
      consoleHeight.value = newHeight;
    } else if (newHeight < minHeight) {
      consoleHeight.value = minHeight;
    } else if (newHeight > maxHeight) {
      consoleHeight.value = maxHeight;
    }
  };


  onMounted(() => {
    window.addEventListener('pointermove', handleConsoleMouseMove)
    window.addEventListener('pointerup', stopConsoleDragging)
  })

  onUnmounted(() => {
    window.removeEventListener('pointermove', handleConsoleMouseMove)
    window.removeEventListener('pointerup', stopConsoleDragging)
  })

</script>

<template>
  <div class="h-screen flex flex-col">
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

    <main class="flex-1 flex overflow-hidden" :class="layoutMode === 'horizontal' ? 'flex-col' : 'flex-row'">
      <!-- preview -->
      <div class="flex-1 overflow-hidden flex flex-col" ref="previewContainer">
        <div class="overflow-auto flex-1">
          <!-- Preview iframe -->
        </div>
        <div v-show="isConsoleShow">
          <div
            class="h-9 editor-bgc cursor-row-resize text-white flex justify-between items-center py-2 px-3"
            @pointerdown="startConsoleDragging"
          >
            <div>
              <h2 class="text-base editor-block-title-color font-bold">
                Console
              </h2>
            </div>
            <div class="flex gap-1">
              <EditorSmallButton class="editorSmallButton-hover-bgc">Clear</EditorSmallButton>
              <EditorSmallButton class="editorSmallButton-hover-bgc" @buttonClick="handleConsoleClose">
                <img :src="close" alt="close button" class="w-[10px] h-[10px]">
              </EditorSmallButton>
            </div>
          </div>
          <div
            class="h-16 editor-bgc"
            :style="{ height: `${consoleHeight}px` }"
          >
          </div>
        </div>
        
      </div>
    </main>

    <footer class="h-8 w-full flex relative justify-between items-center py-[.2rem] px-3 bg-[#2C303A] text-white">
        <div class="flex items-center h-full">
          <EditorSmallButton class="editorSmallButton-hover-bgc" @buttonClick="handleConsoleShow">Console</EditorSmallButton>
        </div>
        <div class="flex items-center h-full">
          <EditorSmallButton class="hover:bg-[#ff3c41]">Delete</EditorSmallButton>
        </div>
    </footer>
  </div>
  
</template>