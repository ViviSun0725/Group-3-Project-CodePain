import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import CollectIcon from '@/components/Editor/icons/CollectIcon.vue'
import CommentIcon from '@/components/Editor/icons/CommentIcon.vue'
import FolderIcon from '@/components/Editor/icons/FolderIcon.vue'
import FollowIcon from '@/components/Editor/icons/FollowIcon.vue'
import LoveIcon from '@/components/Editor/icons/LoveIcon.vue'
import ViewIcon from '@/components/Editor/icons/ViewIcon.vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
