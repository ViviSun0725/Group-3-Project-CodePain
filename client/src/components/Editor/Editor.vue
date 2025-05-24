<script setup>
  import { ref, watch } from 'vue';
  import MonacoEditor from '@guolao/vue-monaco-editor';

  const props = defineProps({
    language: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
    }
  })

  const emit = defineEmits(['update:code'])

  const language = ref(props.language);
  const theme = ref('vs-dark');

  const code = ref(props.code)

  const editorOptions = ref({
    automaticLayout: true,
    scrollbar: {
      scrollDuration: 0 // 減少滾動動畫
    },
    fontSize: 14,
    tabSize: 2,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    roundedSelection: false,
    renderLineHighlight: 'all',
    cursorBlinking: 'blink',
    wordWrap: 'on',
    parameterHints: { enabled: true },
  });

  // 當 Monaco Editor內的 code 變動時，同步更新到 store
  watch(code, (newVal) => {
    emit('update:code', newVal)
  })
</script>

<template>
  <MonacoEditor
    v-model:value="code"
    :language="language"
    :theme="theme"
    :options="editorOptions"
  />
</template>