<template>
<span :class="liked ? 'text-pink-400' : 'text-white'">
              <svg v-if="liked" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.41 3 7.5 3c1.74 0 3.41 1 4.5 2.09C13.09 4 14.76 3 16.5 3 19.59 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318C5.11 5.526 6.223 5 7.5 5c1.54 0 3.04.81 3.75 2.09A4.992 4.992 0 0 1 15 5c1.277 0 2.39.526 3.182 1.318A4.492 4.492 0 0 1 21 9c0 2.485-1.79 4.548-4.5 6.364L12 21.35l-4.5-3.986C5.79 13.548 4 11.485 4 9c0-1.278.526-2.39 1.318-3.182z"/>
              </svg>
            </span>
            <span>{{ liked ? likes + 1 : likes }}</span>
</template>