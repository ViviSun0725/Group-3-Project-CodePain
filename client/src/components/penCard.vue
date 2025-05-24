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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 18V6h12v12H6zm0-2h12V8H6v8zm-2 4V4h16v16H4z" />
          </svg>
        </a>
      </div>

      <!-- 卡片內容 -->
      <div class="p-4">
        <div class="flex items-center justify-between w-full">
          <!-- 左：頭像與資訊 -->
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
          <!-- PRO 與操作選單 -->
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
                <a href="#" class="block px-4 py-2 hover:bg-[#3a3b47]">📁 Add to Collection</a>
                <a href="#" class="block px-4 py-2 hover:bg-[#3a3b47]">🔖 Add to Bookmarks</a>
                <a href="#" class="block px-4 py-2 hover:bg-[#3a3b47] text-blue-400">
                  ✅ Follow {{ authorHandle }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部統計按鈕 -->
        <div class="flex gap-2 mt-3">
          <button
            @click="liked = !liked"
            class="flex items-center gap-1 bg-[#4b4c5c] text-white px-3 py-[2px] rounded-lg font-medium text-sm transition select-none"
          >
            <span :class="liked ? 'text-pink-400' : 'text-white'">
              {{ liked ? '♥' : '♡' }}
            </span>
            <span>{{ liked ? likes + 1 : likes }}</span>
          </button>
          <button
            @click="goToDetailPage"
            class="flex items-center gap-1 bg-[#2d2d38] text-white hover:bg-[#3a3b47] px-3 py-[2px] rounded-lg font-medium text-sm"
          >
            💬 <span>{{ comments }}</span>
          </button>
          <button
            @click="goToAnalyticsPage"
            class="flex items-center gap-1 bg-[#2d2d38] text-white hover:bg-[#3a3b47] px-3 py-[2px] rounded-lg font-medium text-sm"
          >
            👁 <span>{{ views }}</span>
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
const authorLink = '#' // 假資料
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
