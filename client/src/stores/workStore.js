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
        console.log(work);
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

  return { currentWork, currentId, handleCurrentIdChange, updateCurrentCode }
})
  


  // todo:
  // fetch取得作品function 未來的works資料取得
  // 儲存作品function
  // 執行作品function
  // 刪除作品function
 