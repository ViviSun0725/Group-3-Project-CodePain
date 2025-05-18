<script setup>
import { inject, ref } from 'vue';
import Arrow from '../assets/arrow.svg';

const title = inject('title')
const emit = defineEmits(['close'])
const tabs = [
  { label: 'HTML', key: 'html' },
  { label: 'CSS', key: 'css' },
  { label: 'JS', key: 'js' },
  { label: 'Pen Detail', key: 'detail', gapBefore: true },
  { label: 'Privacy', key: 'privacy' },
  { label: 'Behavior', key: 'behavior' },
  { label: 'Editor', key: 'editor' },
  { label: 'Template', key: 'template' },
  { label: 'Screenshot', key: 'screenshot' },
]
const activeTab = ref('html')

</script>
<template>
  <div  class="fixed flex flex-col rounded-sm top-30 left-1/2 -translate-x-1/2 bg-[#131417] text-white w-175 border-4 border-gray-600  h-2/3" >
    <div class="mx-4  pt-4">
      <div class="flex justify-between">
        <span class="after:content-[''] after:border-b-2 after:border-green-400 after:absolute after:-bottom-0.5 after:left-0 after:w-full relative pb-1">Pen Settings</span>
        <button type="button" @click.prevent="emit('close')" class="right-1 bg-[#424655] w-7 flex justify-center h-4">
          <svg class="w-2.5" viewBox="0 0 100 100">
            <path fill="white"
              d="M96.8 83.7L63.1 50l33.7-33.7c3.6-3.6 3.6-9.4 0-13.1s-9.5-3.6-13.1 0L50 36.9 16.3 3.2C12.7-.4 6.9-.4 3.2 3.2s-3.6 9.5 0 13.1L36.9 50 3.2 83.7c-3.6 3.6-3.6 9.4 0 13.1s9.5 3.6 13.1 0L50 63.1l33.7 33.7c3.6 3.6 9.4 3.6 13.1 0s3.6-9.5 0-13.1z">
            </path>
          </svg>
        </button>
      </div>
        <div class="w-full h-0.5 bg-gray-600 mb-4"></div>
      </div>
        <div class="flex h-full px-4">
          <ul class="w-1/4">
              <li v-for="tab in tabs" :key="tab.key" tabindex="0" @click.prevent="activeTab = tab.key"  class="transition hover:bg-gray-600 pl-4 relative -left-4 before:content-[''] before:absolute before:w-1 before:h-full before:left-0 focus:before:bg-green-500" :class="{ 'before:bg-green-500': activeTab === tab.key, 'mt-4': tab.gapBefore,  'bg-gray-600': activeTab === tab.key}">
                {{  tab.label }}
              </li>
          </ul>
          <div  v-show="activeTab === 'html'" class="w-3/4 flex flex-col gap-4">
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="HTML Preprocessor">HTML Preprocessor</label>
              </div>
              <div class="relative">
                <select
                  class="appearance-none w-full border border-gray-300 rounded-sm px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500">
                  <option value="" disabled selected>None</option>
                  <option value="Haml">Haml</option>
                  <option value="Markdown">Markdown</option>
                  <option value="Slim">Slim</option>
                  <option value="Pug">Pug</option>
                </select>
                <div class="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-around text-gray-500 text-xs leading-tight h-1/2">
                  <img :src="Arrow" class="w-3 rotate-180" alt="">
                  <img :src="Arrow" class="w-3" alt="">
                </div>
              </div>
            </div>
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="Add Class(es) to <html>">Add Class(es) to &lt;html&gt;</label>
              </div>
              <div class="relative">
                <input
                  class="appearance-none w-full border border-gray-300 rounded-sm px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500 placeholder-gray-500"
                  placeholder="e.g. single post post-1234"></input>
              </div>
            </div>
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="Add Class(es) to <html>">Stuff for &lt;head&gt;</label>
              </div>
              <div class="relative">
                <textarea type="area"
                  class="appearance-none w-full h-24 border border-gray-300 rounded-sm px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500 placeholder-gray-500"
                  placeholder="e.g. <meta>, <link>, <script>"></textarea>
              </div>
            </div>
          </div>
          <div v-show="activeTab === 'css'" class="w-3/4 flex flex-col gap-4">
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="CSS Preprocessor">CSS Preprocessor</label>
              </div>
              <div class="relative">
                <select
                  class="appearance-none w-full border border-gray-300 rounded-sm px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500">
                  <option value="" disabled selected>None</option>
                  <option value="Haml">Haml</option>
                  <option value="Markdown">Markdown</option>
                  <option value="Slim">Slim</option>
                  <option value="Pug">Pug</option>
                </select>
                <div class="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 flex flex-col justify-around text-gray-500 text-xs leading-tight h-1/2">
                  <img :src="Arrow" class="w-3 rotate-180" alt="">
                  <img :src="Arrow" class="w-3" alt="">
                </div>
              </div>
            </div>
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="CSS Base">CSS Base</label>
              </div>
              <div class="flex flex-col">
                <label>
                <input type="radio" name="CSS Base" value="Normalize" class="appearance-none w-3.5 h-3.5 border-1 border-gray-400 rounded-full checked:bg-blue-300 checked:border-gray-500">
                  Normalize
                </label>
                <label>
                <input type="radio" name="CSS Base" value="Reset" class="appearance-none w-3.5 h-3.5 border-1 border-gray-400 rounded-full checked:bg-blue-300 checked:border-gray-500">
                  Reset
                </label>
                <label>
                <input type="radio" name="CSS Base" value="Neither" class="appearance-none w-3.5 h-3.5 border-1 border-gray-400 rounded-full checked:bg-blue-300 checked:border-gray-500">
                  Neither
                </label>
              </div>
            </div>
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="Vender Prefixing">Vender Prefixing</label>
              </div>
              <div class="flex flex-col">
                <label>
                <input type="radio" name="Vender Prefixing" value="Autoprefixer" class="appearance-none w-3.5 h-3.5 border-1 border-gray-400 rounded-full checked:bg-blue-300 checked:border-gray-500">
                  Autoprefixer
                </label>
                <label>
                <input type="radio" name="Vender Prefixing" value="Prefixfree" class="appearance-none w-3.5 h-3.5 border-1 border-gray-400 rounded-full checked:bg-blue-300 checked:border-gray-500">
                  Prefixfree
                </label>
                <label>
                <input type="radio" name="Vender Prefixing" value="Neither" class="appearance-none w-3.5 h-3.5 border-1 border-gray-400 rounded-full checked:bg-blue-300 checked:border-gray-500">
                  Neither
                </label>
              </div>
            </div>
          </div>
          <div v-show="activeTab === 'detail'" class="w-3/4 flex flex-col gap-4">
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="CSS Preprocessor">CSS Preprocessor</label>
              </div>
              <div class="relative">
                <input type="text" v-model="title" class="appearance-none w-full border border-gray-300 rounded-sm px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-500 placeholder-gray-500" >
              </div>
            </div>
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="">
                <label for="Pen Description">Pen Description</label>
              </div>
              <div class="relative">
                <textarea class="w-full h-24 border border-gray-300 rounded-sm px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500 placeholder-gray-500" placeholder="Explain what's going on in your Pen here. This text is searchable, so it can also help others find your work. Remember to credit others where credit is due. Markdown supported." />
              </div>
            </div>
            <div class="relative bg-linear-to-l from-[#252730] to-[#424655] py-3 px-4 w-full before:h-full before:w-1 before:bg-gray-500 before:content-[''] before:absolute before:top-0 before:left-0">
              <div class="flex justify-between">
                <label for="Tags">Tags</label>
                <span class="text-xs align-text-bottom">comma separated, max of five</span>
              </div>
              <div class="relative">
                <input type="text" class="w-full border border-gray-300 rounded-sm px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-sm text-gray-500 placeholder-gray-500" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-600 w-full flex flex-col py-4 px-2">
          <button type="submit" @click.prevent="emit('close')" class="self-end bg-green-400 text-black rounded-md p-3">Save & Close</button>
        </div>
      </div>
</template>