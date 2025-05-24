<script setup>
  import { ref, watch } from 'vue';
  import { useWorkStore } from '@/stores/workStore';
  const workStore = useWorkStore();
  const { updatePreviewSrc }= workStore;
  
  const props = defineProps({
    html:{
      type: String
    },
    css:{
      type: String
    },
    javascript:{
      type: String
    },
    isAutoPreview: {
      type: Boolean,
    }
  })

  // debounce
  function debounce(func, wait = 1000) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const previewFrame = ref(null)

  // 更新 iframe 內容（加防抖處理）
  const updateIframe = debounce(() => {
    if (!previewFrame.value) return
    previewFrame.value.srcdoc = updatePreviewSrc()
  }, 1000)

  watch(
    [() => props.html, () => props.css, () => props.javascript],
    () => {
      if (props.isAutoPreview) updateIframe()
    }
  )

  // 監聽是否啟用自動預覽
  watch(() => props.isAutoPreview, (val) => {
    if (val) updateIframe()
  }, { immediate: true })

</script>
<template>
  <iframe ref="previewFrame" sandbox="allow-scripts" class="preview h-full w-full"></iframe>
</template>

