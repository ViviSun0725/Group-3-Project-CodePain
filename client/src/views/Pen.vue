<script setup>
	import { provide, ref, onMounted, onUnmounted } from 'vue';
  import Icon from '../assets/icon.svg';
  import Edit from '../assets/edit.svg';
  import Like from '../assets/like.svg';
  import Cloud from '../assets/cloud.svg';
  import Arrow from '../assets/arrow.svg';
  import ArrowWhite from '../assets/arrow-white.svg';
  import Settings from '../assets/settings.svg';
  import Layout from '../assets/layout.svg';
  import close from '../assets/close.svg';
  import penSetting from '../components/Editor/penSetting.vue';
  import EditorSmallButton from '../components/Editor/EditorSmallButton.vue';

	const isLoggedIn = ref(false);
  const isConsoleDragging = ref(false);
  const consoleHeight = ref(200);  // 預設高度 px
  const previewContainer = ref(null);
  const navListVisible = ref(false);




  const startConsoleDragging = () => {
    isConsoleDragging.value = true
    document.body.classList.add('select-none')
  };

  const stopConsoleDragging = () => {
    if (isConsoleDragging.value) {
      isConsoleDragging.value = false;
      document.body.classList.remove('select-none');
    }
  };

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
    window.addEventListener('pointermove', handleConsoleMouseMove);
    window.addEventListener('pointerup', stopConsoleDragging);
  });

  onUnmounted(() => {
    window.removeEventListener('pointermove', handleConsoleMouseMove);
    window.removeEventListener('pointerup', stopConsoleDragging);
  });

  const saveOptionVisible = ref(false);
  const layoutOptionVisible = ref(false);
  const bookmarkVisible = ref(false);
  const title = ref('Title');
  const isEditing = ref(false);
  const settingOptionVisible = ref(false);
  const isConsoleShow = ref(false);

  provide('title', title)

  const handleConsoleClose = () => {
    isConsoleShow.value = false;
  };

  const toggleConsole = ()=> {
    isConsoleShow.value = !isConsoleShow.value
  };
  const toggleSave = () => {
    saveOptionVisible.value = !saveOptionVisible.value
  };
  const toggleLayout = () => {
    layoutOptionVisible.value = !layoutOptionVisible.value
  };
  const toggleSetting = () => {
    settingOptionVisible.value = !settingOptionVisible.value
  };
  const toggleList = () => {
    navListVisible.value = !navListVisible.value
  };


  const layoutOptions = [
    { id: 'left', rotation: -90 },
    { id: 'center', rotation: 0 },
    { id: 'right', rotation: 90 }
  ];


  const selectedLayout = ref(layoutOptions[1]);
  const selectLayout = (layout) => {
    selectedLayout.value = layout
    layoutOptionVisible.value = false
  };


  const toggleEdit = () => {
    isEditing.value = true
    setTimeout(() => {
      document.getElementById('title-input')?.focus()
    }, 0)
  };

  const stopEdit = () => {
    isEditing.value = false
  };

</script>

<template>
  <div class="flex flex-col h-dvh">
    <nav class="relative md:h-16 h-14 w-full bg-black flex items-center justify-between">
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
            <img :src="Edit" alt="" class="w-[13px] h-[13px] hover:cursor-pointer" />
          </button>
          <div>
            <a href="#" class="text-sm text-white">Author</a>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 mr-3">
        <button v-if="isLoggedIn" type="button" class="text-[aliceblue] rounded px-3 md:px-5 py-1 md:py-2 bg-[#444857] hover:bg-[#5A5F73] hover:cursor-pointer">
          <div class="h-7 flex">
            <img :src="Like" alt="" class="w-4">
          </div>
        </button>
        <div class="md:flex hidden">
          <button type="button" class="text-[aliceblue] rounded-l px-5 py-2 bg-[#444857] mr-[1px] hover:bg-[#5A5F73] hover:cursor-pointer"
            :class="{ 'rounded mr-[2px]': !isLoggedIn }">
            <div class="h-7 flex items-center gap-1">
              <img :src="Cloud" alt="" class="w-4">
              <span>Save</span>
            </div>
          </button>
          <div class="relative ">
            <button v-if="isLoggedIn" @click.prevent="toggleSave" type="button"
              class="relative text-[aliceblue] rounded-r  py-2 bg-[#444857] flex justify-center items-center w-5 hover:bg-[#5A5F73] hover:cursor-pointer">
              <div class="h-7 flex justify-center items-center">
                <img :src="Arrow" alt="" class="w-[10px]">
              </div>
            </button>
            <div v-if="saveOptionVisible" class="fixed inset-0 transition-opacity duration-200" @click="toggleSave"></div>
            <ul 
              v-if="saveOptionVisible" class="absolute z-50 flex flex-col rounded-sm top-12 right-0 bg-[#2C303A] text-white w-65 justify-around border-4 border-gray-800 px-5"
            >
              <label class="flex py-2  justify-between border-b border-gray-600 hover:cursor-pointer">
                <span>Private</span>
                <div class="relative inline-block w-13 h-7 ">
                  <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                  <span
                    class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"></span>
                </div>
              </label>
              <label class="flex py-2 justify-between border-b border-gray-600 hover:cursor-pointer">
                <span>Template</span>
                <div class="relative inline-block w-13 h-7 ">
                  <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                  <span
                    class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"></span>
                </div>
              </label>
              <label class="flex py-2 justify-between border-b border-gray-600 hover:cursor-pointer">
                <span>Auto Save</span>
                <div class="relative inline-block w-13 h-7 ">
                  <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                  <span
                    class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"></span>
                </div>
              </label>
              <label class="flex py-2 justify-between hover:cursor-pointer">
                <span>Format Code on Save</span>
                <div class="relative inline-block w-13 h-7 ">
                  <input type="checkbox" name="" id="" class="opacity-0 w-0 h-0 peer">
                  <span
                    class="absolute pointer bg-gray-300 top-0 left-0 right-0 bottom-0 rounded-4xl peer-checked:bg-green-400  transition before:content-[''] before:h-8 before:w-8 before:left-0 before:bottom-[-2px] before:bg-white before:transition  before:absolute before:rounded-4xl  peer-checked:before:translate-x-6"
                    ></span>
                </div>
              </label>
            </ul>
          </div>
        </div>
        <div v-if="navListVisible" class="fixed inset-0 z-40 transition-opacity duration-200" @click="toggleList"></div>
        <button @click.prevent="toggleList" type="button" class="flex md:hidden text-[aliceblue] rounded px-2 py-1 bg-[#444857] hover:bg-[#5A5F73] hover:cursor-pointer" >
          <div class="h-7 flex justify-between w-6 items-center">
            <div class="transition-transform h-0.5 bg-gray-200 relative before:content-[''] before:w-1.5 before:h-0.5 before:bg-gray-200 before:absolute before:-top-1.5 before:left-0 after:content-[''] after:w-3.5 after:h-0.5 after:bg-gray-200 after:absolute after:-bottom-1.5 after:left-0" :class="navListVisible ? 'before:w-2 w-1.5' : 'before:w-1.5 w-2.5'"></div>
            <img :src="ArrowWhite" alt="" class=" transition-transform	w-3 self-start mt-1.5 " :class=" {'scale-y-[-1]':navListVisible}">
          </div>
        </button>
        <div v-if="navListVisible" class="z-50 absolute flex flex-col top-14 right-0 w-55 gap-1 py-1 bg-[#1E1F26] rounded-sm">
          <button class="flex w-full px-2 py-1 hover:bg-gray-500">
            <img :src="Cloud" alt="" class="w-4">
            <span>Save</span>
          </button>
          <button @click.prevent="toggleSetting" class="flex w-full px-2 py-1 hover:bg-gray-500">
            <img :src="Settings" alt="" class="w-4">
            <span>Settings</span>
          </button>
          <div class="w-full bg-gray-700 h-[1px] mb-4"></div>
        </div>
        <button @click.prevent="toggleSetting" type="button" class="hidden md:flex text-[aliceblue] rounded px-4 py-2 bg-[#444857] hover:bg-[#5A5F73] hover:cursor-pointer" >
          <div class="h-7 flex items-center gap-1">
            <img :src="Settings" alt="" class="w-4">
            <span>Settings</span>
          </div>
        </button>
        <div v-if="settingOptionVisible" class="fixed inset-0 bg-black/50 z-40 transition-opacity duration-200" @click="toggleSetting"></div>
        <penSetting v-if="settingOptionVisible"  @close="toggleSetting" class="z-50" />

        <div class="relative md:flex hidden">
          <button type="button" @click.prevent="toggleLayout" class="text-[aliceblue] rounded px-4 py-2 bg-[#444857] hover:bg-[#5A5F73] hover:cursor-pointer">
            <div class="h-7 flex items-center gap-1">
              <img :src="Layout" alt="" class="w-[14px]" :style="{ transform: `rotate(${selectedLayout.rotation}deg)` }">
            </div>
          </button>
          <div v-if="layoutOptionVisible" class="fixed inset-0 transition-opacity duration-200" @click="toggleLayout"></div>
          <div v-if="layoutOptionVisible" class="absolute z-50 bg-[#2C303A] right-0 py-3 rounded-lg border-4 border-gray-800">
            <div class="px-3 text-white">
              <span>Change View</span>
            </div>
            <div class="flex justify-center align-middle py-3">
              <div class="flex justify-center align-middle py-3 ">
                <label
                  v-for="option in layoutOptions" :key="option.id" class="border-2 border-[#444857] w-20 flex justify-center h-12 hover:bg-[#5A5F73]  hover:cursor-pointer" :class="{ 'rounded-l-sm': option.id === 'left', 'rounded-r-sm': option.id === 'right', 'bg-[#444857]': selectedLayout.id === option.id }"
                >
                  <button @click="selectLayout(option) " class=" hover:cursor-pointer">
                    <img :src="Layout" :style="{ transform: `rotate(${option.rotation}deg)` }" class="w-5 "  alt="">
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

        <button v-if="!isLoggedIn" type="button" class="text-black rounded px-2 py-1 md:px-4 md:py-2 bg-[#47cf73] hover:cursor-pointer">
          <div class="h-7 flex items-center gap-1">
            <span>Sign Up</span>
          </div>
        </button>
        <button v-if="!isLoggedIn" type="button" class="text-[aliceblue] rounded px-2 py-1 md:px-4 md:py-2 bg-[#444857] hover:cursor-pointer">
          <div class="h-7 flex items-center gap-1">
            <span>Log In</span>
          </div>
        </button>
        <div v-if="isLoggedIn" class="w-9 h-9 md:w-11 md:h-11 overflow-hidden mx-1 rounded hover:cursor-pointer">
          <img src="https://fakeimg.pl/300x200/500" class="w-full h-full object-cover" />
        </div>
      </div>
    </nav>

    <main class="flex-1 flex overflow-hidden w-full" :class="selectedLayout.id === 'center' ? 'flex-col' : 'flex-row'">
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
          <EditorSmallButton class="editorSmallButton-hover-bgc" @buttonClick="toggleConsole">Console</EditorSmallButton>
        </div>
        <div class="flex items-center h-full">
          <EditorSmallButton class="hover:bg-[#ff3c41]">Delete</EditorSmallButton>
        </div>
    </footer>
  </div>
</template>