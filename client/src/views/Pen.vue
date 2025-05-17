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
  import penSetting from './penSetting.vue';
  import EditorSmallButton from '../components/Editor/EditorSmallButton.vue';

	const isLoggedIn = ref(true)
  const isConsoleDragging = ref(false)
  const consoleHeight = ref(200)  // 預設高度 px
  const previewContainer = ref(null)

 
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

const saveOptionVisible = ref(false)
const layputOptionVisible = ref(false)
const bookmarkVisible = ref(false)
const title = ref('Title')
const isEditing = ref(false)
const settingOptionVisible = ref(false)

const isConsoleShow = ref(true)

const handleConsoleShow = ()=> {
    isConsoleShow.value = !isConsoleShow.value
  }
const toggleSave = () => {
  saveOptionVisible.value = !saveOptionVisible.value
}
const toggleLayout = () => {
  layputOptionVisible.value = !layputOptionVisible.value
}
const toggleSetting = () => {
  settingOptionVisible.value = !settingOptionVisible.value
}
const toggleBookmark = () => {
  bookmarkVisible.value = !bookmarkVisible.value
}

const layoutOptions = [
  { id: 'left', rotation: -90 },
  { id: 'center', rotation: 0 },
  { id: 'right', rotation: 90 }
]


const selectedLayout = ref(layoutOptions[1])
const selectLayout = (layout) => {
  selectedLayout.value = layout
  layputOptionVisible.value = false
}


const toggleEdit = () => {
  isEditing.value = true
  setTimeout(() => {
    document.getElementById('title-input')?.focus()
  }, 0)
}

const stopEdit = () => {
  isEditing.value = false
}



</script>

<template>

  <nav class="relative h-[65px] w-full bg-black flex items-center justify-between">
    <div class="flex items-center ml-2">
      <a href="/" class="flex text-0 ">
        <img :src="Icon" alt="" class=" w-9 mb-2 ml-1 mr-2 ">
      </a>
      <div>
        <template v-if="isEditing">
          <input id="title-input" v-model="title" @blur="stopEdit" @keyup.enter="stopEdit"
            class="bg-transparent border-b border-white text-white outline-none" />
        </template>
        <template v-else>
          <span class="text-white font-black">{{ title }}</span>
        </template>
        <button type="button" class="ml-1" @click="toggleEdit">
          <img :src="Edit" alt="" class="w-[13px] h-[13px]" />
        </button>
        <div>
          <a href="#" class="text-sm text-white">Author</a>

        </div>
      </div>
    </div>


    <div class="flex items-center gap-3 mr-3">
      <button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded px-5 py-2 bg-[#444857] hover:bg-[#5A5F73]">
        <div class="h-7 flex">
          <img :src="Like" alt="" class="w-[16px]">
        </div>
      </button>
      <div class="flex">
        <button type="button" class="text-[aliceblue] rounded-l px-5 py-2 bg-[#444857] mr-[1px] hover:bg-[#5A5F73]"
          :class="{ 'rounded mr-[10px]': !isLoggedIn }">
          <div class="h-7 flex items-center gap-1">
            <img :src="Cloud" alt="" class="w-[16px]">
            <span>Save</span>
          </div>
        </button>
        <div class="relative ">
          <button v-if="isLoggedIn" @click.prevent="toggleSave" type="button"
            class="relative text-[aliceblue] rounded-r  py-2 bg-[#444857] flex justify-center items-center w-5 hover:bg-[#5A5F73]">
            <div class="h-7 flex justify-center items-center">
              <img :src="Arrow" alt="" class="w-[10px]">
            </div>
          </button>
          <div v-if="saveOptionVisible" class="fixed inset-0 transition-opacity duration-200" @click="toggleSave"></div>
          <ul v-if="saveOptionVisible" class="absolute flex flex-col rounded-sm top-12 right-0 bg-[#2C303A] text-white w-65 justify-around border-4 border-gray-800 px-5">
            <div class="flex py-2  justify-between border-b border-gray-600">
              <span>Private</span>
              <label class="relative inline-block w-13 h-7 ">
                <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                <span
                  class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"></span>
              </label>
            </div>
            <div class="flex py-2 justify-between border-b border-gray-600">
              <span>Template</span>
              <label class="relative inline-block w-13 h-7 ">
                <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                <span
                  class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"></span>
              </label>
            </div>
            <div class="flex py-2 justify-between border-b border-gray-600">
              <span>Auto Save</span>
              <label class="relative inline-block w-13 h-7 ">
                <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                <span
                  class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"></span>
              </label>
            </div>
            <div class="flex py-2 justify-between ">
              <span>Format Code on Save</span>
              <label class="relative inline-block w-13 h-7 ">
                <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                <span
                  class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"
                  ></span>
              </label>
            </div>
          </ul>
        </div>
      </div>



      <button @click.prevent="toggleSetting" type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] hover:bg-[#5A5F73]">
        <div class="h-7 flex items-center gap-1">
          <img :src="Settings" alt="" class="w-[16px]">
          <span>Settings</span>
        </div>
      </button>
      <div v-if="settingOptionVisible" class="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200" @click="toggleSetting"></div>
 
      <penSetting  v-if="settingOptionVisible"  @close="toggleSetting" class="z-50" />

      <div class="relative">
        <button type="button" @click.prevent="toggleLayout" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] hover:bg-[#5A5F73]">
          <div class="h-7 flex items-center gap-1">
            <img :src="Layout" alt="" class="w-[14px]" :style="{ transform: `rotate(${selectedLayout.rotation}deg)` }">
          </div>
        </button>
      <div v-if="layputOptionVisible" class="fixed inset-0 transition-opacity duration-200" @click="toggleLayout"></div>
        <div v-if="layputOptionVisible" class="absolute bg-[#2C303A] right-0 py-3 rounded-lg border-4">
          <div  class="px-3 text-white">
            <span>Change View</span>
          </div>
          <div class="flex justify-center align-middle py-3">
            <div class="flex justify-center align-middle py-3">
              <label v-for="option in layoutOptions" :key="option.id" class="border-2 border-[#444857] w-20 flex justify-center h-12 hover:bg-[#5A5F73]" :class="{ 'rounded-l-sm': option.id === 'left', 'rounded-r-sm': option.id === 'right', 'bg-[#444857]': selectedLayout.id === option.id }">
                <button @click="selectLayout(option) ">
                  <img :src="Layout" :style="{ transform: `rotate(${option.rotation}deg)` }" class="w-5" alt="">
                </button>
              </label>
            </div>
          </div>
          <ul class="relative flex flex-col rounded-sm right-0 bg-[#2C303A] text-white w-65  justify-between ">
            <div class="flex py-1 px-5 justify-between">
              <a href="#" class="flex justify-between w-full" target="_blank">
                <div>Full Page View</div>
                <div>full/</div>
              </a>
            </div>
          </ul>
        </div>
      </div>
      <div class="flex">
        <button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded-l px-4 py-2 bg-[#444857] mr-[1px] hover:bg-[#5A5F73]">
          <div class="h-7 flex items-center gap-1">
            <img :src="Bookmark" alt="" class="w-[12px]">
          </div>
        </button>
        <button v-if="isLoggedIn" @click.prevent="toggleBookmark" type="button"
          class="text-[aliceblue] rounded-r py-2 bg-[#444857] flex justify-center items-center w-[20px] hover:bg-[#5A5F73]">
          <div class="h-7 flex justify-center items-center">
            <img :src="Arrow" alt="" class="w-[10px]">
          </div>
        </button>
          <div v-if="bookmarkVisible" class="fixed inset-0 transition-opacity duration-200" @click="toggleBookmark"></div>


        <ul v-if="bookmarkVisible" class="absolute flex flex-col rounded-sm top-30 left-1/2 -translate-x-1/2 bg-[#2C303A] text-white w-3/4 h-49 justify-between ">
        </ul>
      </div>
      <button v-if="!isLoggedIn" type="button" class="text-black rounded px-4 py-2 bg-[#47cf73]">
        <div class="h-7 flex items-center gap-1">
          <span>Sign Up</span>
        </div>
      </button>
      <button v-if="!isLoggedIn" type="button" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857]">
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
  
</template>