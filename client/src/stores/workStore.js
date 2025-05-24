import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWorkStore = defineStore('work', () => {
  const workTemplate = ref([
    {
      title: "",
      html: "",
      css: "",
      javascript: "",
      isAutoSave: true,
      isAutoPreview: true,
      viewMode: "center",
      createAt: new Date(),
      lastSavedTime: null,
    }
  ])
  const currentId = ref('123123123123');
  const works = ref([
    {
      id: "123123123123",
      title: "這是測試檔案1",
      html: "<h1>456</h1>",
      css: "h1 {color: blue}",
      javascript: "console.log(456)",
      isAutoSave: true,
      isAutoPreview: true,
      viewMode: "center",
      createAt: new Date(),
      lastSavedTime: null,
      user_id: "0098837589"
    },
    {
      id: "12312398i06o83",
      title: "這是測試檔案2",
      html:"<h1>123</h1>",
      css: "h1 {color: red}",
      javascript:"console.log(123)",
      isAutoSave: true,
      isAutoPreview: true,
      viewMode: "center",
      createAt: new Date(),
      lastSavedTime: null,
      user_id: "0098837589"
    }
  ])

  // 回傳特定(指定id)作品
  const currentWork = computed(() => {
    if(currentId.value.length) {
      return works.value.filter((work) => {
        return work.id === currentId.value
      })
    } else {
      return workTemplate.value
    }
  })


  // 改變currentId function
  const handleCurrentIdChange = (id) => {
    currentId.value = id
  }
  
  // 更新CurrentCode
  const updateCurrentCode = (language, newCode) => {
    currentWork.value[0][language] = newCode
  }

  // 開關自動更新狀態
  const toggleAutoPreview = () => {
    console.log(currentWork.value[0].isAutoPreview);
    currentWork.value[0].isAutoPreview = !currentWork.value[0].isAutoPreview
  }

  // 更新作品Preview function
  // const updatedPreview = ref('');
  const iframeMessage = ref('');
  const updatePreviewSrc = () => {
    console.log()
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <style>${currentWork.value[0].css}</style>
      </head>
      <body>
        ${currentWork.value[0].html}
        <script>
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;

          // 覆寫 console 方法，將輸出傳回父頁面
          ['log', 'error', 'warn'].forEach(method => {
            console[method] = (...args) => {
              window.parent.postMessage({
                type: 'log',
                message: args.map(arg =>
                  typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(' '),
                level: method
              }, '*');
              originalLog(...args);
            };
          });

          // 設置執行超時機制
          const timeout = setTimeout(() => {
            window.parent.postMessage({
              type: 'log',
              message: '執行超時，程式碼停止。',
              level: 'error'
            }, '*');
            throw new Error('程式碼執行超時');
          }, 5000); // 設定5秒為超時時間（可以根據需要調整）

          try {
            const userCode = ${JSON.stringify(currentWork.value[0].javascript)};
            const customConsole = console;
            const func = new Function('console', userCode);
            func(customConsole);
          } catch (err) {
            window.parent.postMessage({
              type: 'log',
              message: err.stack || err.message || String(err),
              level: 'error'
            }, '*');
          } finally {
            clearTimeout(timeout); // 如果程式碼正常結束，清除超時計時器
          }
        <\/script>
      </body>
      </html>
    `
  }

  return { 
    currentWork,
    currentId,
    handleCurrentIdChange,
    updateCurrentCode,
    toggleAutoPreview,
    updatePreviewSrc
  }
})
  
  

  // todo:
  // fetch取得作品function 未來的works資料取得
  // 儲存作品function
  // 執行作品function
  // 刪除作品function
 