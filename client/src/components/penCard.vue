<template>
  <div class="min-h-screen bg-[#111] flex items-center justify-center p-8">
    <div
      class="group w-[360px] bg-[#1e1f26] text-white rounded-lg shadow-md
             transition-all duration-300 ease-in-out transform scale-95 translate-y-1
             hover:scale-100 hover:translate-y-0 hover:shadow-2xl relative"
    >
      <!-- 預覽圖片 -->
      <div class="relative">
        <img
          :src="imageUrl"
          @error="imageUrl = fallbackImage"
          alt="Card Preview"
          class="w-full h-auto"
        />
        <a
          :href="externalLink"
          target="_blank"
          class="absolute top-2 right-2 bg-black/50 rounded p-1 opacity-0 group-hover:opacity-100 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18V6h12v12H6zm0-2h12V8H6v8zm-2 4V4h16v16H4z" />
          </svg>
        </a>
      </div>

      <!-- 卡片內容 -->
      <div class="p-4">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <a :href="authorLink" target="_blank">
              <img :src="authorAvatar" class="w-10 h-10 rounded-full shrink-0" alt="Avatar" />
            </a>
            <div>
              <a :href="editorLink" target="_blank" class="block font-bold text-base text-white">
                {{ title }}
              </a>
              <a :href="authorLink" target="_blank" class="block text-sm text-gray-300 hover:underline">
                <span class="font-medium">{{ author }}</span>
                <span class="text-xs text-gray-400">{{ authorNote }}</span>
              </a>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <a
              :href="proLink"
              target="_blank"
              class="inline-block bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-[1px] rounded hover:bg-yellow-300 transition"
            >
              PRO
            </a>
            <div class="relative">
              <button
                class="text-white text-xl font-bold hover:text-gray-300"
                @click="menuOpen = !menuOpen"
              >
                •••
              </button>
              <div
                v-if="menuOpen"
                class="absolute right-0 mt-2 w-48 bg-[#2b2c36] text-sm rounded shadow-lg z-50 overflow-hidden border border-gray-700"
              >
                <a href="#" class="block px-4 py-2 hover:bg-[#3a3b47] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18m-6 5h6" />
                  </svg>
                  Add to Collection
                </a>
                <a href="#" class="block px-4 py-2 hover:bg-[#3a3b47] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 3a2 2 0 0 0-2 2v16l9-4 9 4V5a2 2 0 0 0-2-2H5z" />
                  </svg>
                  Add to Bookmarks
                </a>
                <a href="#" class="block px-4 py-2 hover:bg-[#3a3b47] text-blue-400 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Follow {{ authorHandle }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 統計按鈕 -->
        <div class="flex gap-2 mt-3">
          <button
            @click="liked = !liked"
            class="flex items-center gap-1 bg-[#4b4c5c] text-white px-3 py-[2px] rounded-lg font-medium text-sm transition select-none"
          >
            <span :class="liked ? 'text-pink-400' : 'text-white'">
              <svg v-if="liked" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.41 3 7.5 3c1.74 0 3.41 1 4.5 2.09C13.09 4 14.76 3 16.5 3 19.59 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318C5.11 5.526 6.223 5 7.5 5c1.54 0 3.04.81 3.75 2.09A4.992 4.992 0 0 1 15 5c1.277 0 2.39.526 3.182 1.318A4.492 4.492 0 0 1 21 9c0 2.485-1.79 4.548-4.5 6.364L12 21.35l-4.5-3.986C5.79 13.548 4 11.485 4 9c0-1.278.526-2.39 1.318-3.182z"/>
              </svg>
            </span>
            <span>{{ liked ? likes + 1 : likes }}</span>
          </button>

          <button
            @click="goToDetailPage"
            class="flex items-center gap-1 bg-[#2d2d38] text-white hover:bg-[#3a3b47] px-3 py-[2px] rounded-lg font-medium text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.985 9.985 0 0 1-4.9-1.302L3 21l1.505-3.01A8.96 8.96 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <span>{{ comments }}</span>
          </button>

          <button
            @click="goToAnalyticsPage"
            class="flex items-center gap-1 bg-[#2d2d38] text-white hover:bg-[#3a3b47] px-3 py-[2px] rounded-lg font-medium text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{{ views }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const fallbackImage = 'https://via.placeholder.com/600x400?text=No+Preview'
const imageUrl = ref('https://picsum.photos/600/400')
const externalLink = 'https://codepen.io/simeydotme/pen/gObXYZo'
const editorLink = 'https://codepen.io/simeydotme/pen/gObXYZo'
const authorLink = '#'
const authorAvatar = 'https://assets.codepen.io/123/internal/avatars/users/default.png'
const proLink = 'PRO 的購買頁面'
const title = 'RC_mob_5-21'
const author = 'Sophia'
const authorNote = '(fractal kitty) (she/her)'
const authorHandle = '@fractalkitty'
const likes = 2
const comments = 0
const views = '13'

const menuOpen = ref(false)
const liked = ref(false)

const goToDetailPage = () => {
  window.location.href = `/details/rc-mob-5-21`
}

const goToAnalyticsPage = () => {
  window.location.href = `/analytics/rc-mob-5-21`
}
</script>