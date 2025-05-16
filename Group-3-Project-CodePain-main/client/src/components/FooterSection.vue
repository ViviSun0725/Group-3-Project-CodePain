<template>
  <footer class="fixed bottom-0 left-0 w-full bg-[#0d0d0d] text-white text-xs px-20 py-10 flex flex-wrap justify-between z-[999]">
    <FooterSection title="CodePen" :items="['About', 'Blog', 'Podcast', 'Documentation', 'Support', 'Advertise']" />
    <FooterSection title="For" :items="['Teams', 'Education', 'Embeds', 'Asset Hosting']" />
    <FooterSection title="Social" :items="['YouTube', 'Bluesky', 'Instagram', 'Mastodon']" />
    <FooterSection title="Community" :items="['Spark', 'Challenges', 'Topics', 'Code of Conduct']" />

    <div class="w-full text-center mt-10 text-[11px] text-gray-500">
      <p>©2025 CodePen</p>
      <p><em>Demo or it didn’t happen.</em></p>
      <p>
        <a href="#" class="text-gray-500 no-underline hover:underline mx-1">Terms of Service</a> -
        <a href="#" class="text-gray-500 no-underline hover:underline mx-1">Privacy Policy</a>
      </p>
    </div>
  </footer>
</template>

<script setup>
import FooterSection from './FooterSection.vue'
</script>