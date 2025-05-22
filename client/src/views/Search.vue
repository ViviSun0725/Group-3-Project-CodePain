<script setup>
import { ref, computed, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const inputKeyword = ref(""); // 使用者輸入的內容（v-model 綁定 input）
const searchKeyword = ref(""); // 真的要用來搜尋的關鍵字
const keyword = computed(() => searchKeyword.value);

const activeTab = computed(() => route.params.category || "pens");

const tabColors = {
  pens: "#0EBEFF",
  projects: "#FFDD40",
  collections: "#AE63E4",
};

const itemsPerPage = 6;
const currentPage = ref(1); // 預設當前頁面為第一頁

function onSearchSubmit() {
  router.push({
    path: `/search/${route.params.category || "pens"}`,
    query: { q: searchKeyword.value },
  });

  searchKeyword.value = inputKeyword.value; // ✅ 執行搜尋
  currentPage.value = 1;
}

// 1. 模擬搜尋結果

// TODO：未來改成 cursor-based 自動載入下一頁
const fakeData = {
  pens: [
    { id: "pen-1", title: "CSS Grid Layout" },
    { id: "pen-2", title: "HTML Button Styles" },
    { id: "pen-3", title: "JavaScript Timer" },
    { id: "pen-4", title: "Vue Basics Demo" },
    { id: "pen-5", title: "TailwindCSS Card" },
    { id: "pen-6", title: "Form Validation" },
    { id: "pen-7", title: "CSS Flex Examples" },
    { id: "pen-8", title: "HTML Table Style" },
    { id: "pen-9", title: "JS Carousel" },
    { id: "pen-10", title: "Vue Reactive List" },
  ],
  projects: [
    { id: "proj-1", title: "Portfolio Website" },
    { id: "proj-2", title: "Vue Weather App" },
    { id: "proj-3", title: "Blog Platform" },
    { id: "proj-4", title: "React Task Manager" },
    { id: "proj-5", title: "Node.js API Server" },
    { id: "proj-6", title: "E-commerce Dashboard" },
    { id: "proj-7", title: "Login Auth System" },
    { id: "proj-8", title: "Interactive Resume" },
    { id: "proj-9", title: "Chat App with Socket.io" },
    { id: "proj-10", title: "Markdown Note Editor" },
    { id: "proj-11", title: "Project Tracker" },
    { id: "proj-12", title: "Vue 3 + Tailwind Template" },
  ],
  collections: [
    { id: "coll-1", title: "Frontend UI Snippets" },
    { id: "coll-2", title: "JavaScript Animations" },
    { id: "coll-3", title: "Vue Component Library" },
    { id: "coll-4", title: "CSS Framework Demos" },
    { id: "coll-5", title: "Design Systems" },
    { id: "coll-6", title: "Favorite Templates" },
    { id: "coll-7", title: "Weekly Code Picks" },
    { id: "coll-8", title: "JS One-liners" },
    { id: "coll-9", title: "Button Hover Effects" },
    { id: "coll-10", title: "Form Examples" },
  ],
};
const allCards = ref();

const filteredCards = computed(() => {
  if (!searchKeyword.value.trim()) return [];
  const lowerKeyword = searchKeyword.value.toLowerCase();
  return allCards.value.filter((card) =>
    card.title.toLowerCase().includes(lowerKeyword)
  );
});

// 計算總頁數
const totalPages = computed(() =>
  Math.ceil(filteredCards.value.length / itemsPerPage)
);

// 目前頁面要顯示的卡片們
const currentPageCards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCards.value.slice(start, start + itemsPerPage);
});

// 有無搜尋結果 (V-if切換訊息)
const isContent = computed(() => currentPageCards.value.length > 0);

const isEmptySearchResult = computed(() => {
  return searchKeyword.value.trim() !== "" && filteredCards.value.length === 0;
});

watchEffect(() => {
  const category = route.params.category || "pens";
  allCards.value = fakeData[category] || [];

  currentPage.value = 1;
  inputKeyword.value = route.query.q || "";
  searchKeyword.value = "";
});

// 換頁方法
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
</script>
<template>
  <main class="bg-[#131417]">
    <div
      class="width-wrapper w-full max-w-[75rem] mx-auto px-8 pt-6 relative text-white"
    >
      <div class="SearchPage_root px-3 pb-6">
        <div class="SearchPage_controls_root mb-6">
          <div
            class="SearchPage_control_row flex flex-wrap items-stretch justify-between ps-2 pt-2.5 border-t-4 bg-[#1E1F26] border-t-[#0EBEFF]"
            :style="{
              borderTopColor: tabColors[activeTab],
            }"
          >
            <div class="SearchPage_controls_Search_Form w-[300px] h-full mb-2">
              <form
                action=""
                class="bg-[#444857] focus-within:bg-[#5A5F73] rounded-md"
                @submit.prevent="onSearchSubmit"
              >
                <label for="#" class="relative group">
                  <i
                    class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-gray-200"
                  ></i>
                  <input
                    v-model="inputKeyword"
                    class="w-full h-full pl-10 pr-4 py-2 placeholder-gray-400 focus:outline-none group-focus-within:placeholder-gray-200"
                    autocomplete="off"
                    placeholder="Search Codecaine..."
                    type="text"
                    name="q"
                    value
                  />
                </label>
              </form>
            </div>

            <div class="SearchPage_controls_options flex space-x-2 pe-2 mb-2">
              <!-- 靜態按鈕 -->
              <a
                href="/your-work"
                class="px-3 py-1 h-full rounded bg-[#4F5465] text-white text-sm hover:bg-[#5A5F73] transition transform active:translate-y-0.5 flex items-center"
              >
                <svg
                  viewBox="0 0 71 89"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current w-3 mr-1.5"
                >
                  <path
                    d="M67.783 66.757c-3.771-5.87-8.347-9.685-14.883-11.845 0 0-4.932-2.547-17.825-2.547S17.25 54.912 17.25 54.912C10.713 57.09 6.14 60.887 2.36 66.757.857 69.067.056 73.716 0 76.195c.02.645 0 1.391 0 2.14v4.28-2.954c0 4.734 3.216 8.568 7.188 8.568h55.756c3.972 0 7.188-3.834 7.188-8.568v2.955-4.28c0-.75-.01-1.496 0-2.14-.048-2.48-.86-7.129-2.35-9.439m-52.37-46.875c0 10.972 6.818 27.097 19.653 27.097 12.62 0 19.646-16.125 19.646-27.097C54.711 8.91 45.913 0 35.065 0 24.21 0 15.41 8.91 15.41 19.882"
                  ></path>
                </svg>
                Your Work
              </a>
              <a
                href="/search/pens?q="
                class="px-3 py-1 rounded bg-[#4F5465] text-white text-sm hover:bg-[#5A5F73] transition transform active:translate-y-0.5 flex items-center"
              >
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current w-3 mr-1.5"
                  :class="{ 'text-[#0EBEFF]': activeTab === 'pens' }"
                >
                  <path
                    d="M0 9.002C0 8.45.455 8 .992 8h18.016c.548 0 .992.456.992 1.002v9.996c0 .553-.455 1.002-.992 1.002H.992C.444 20 0 19.544 0 18.998zm0-8C0 .45.451 0 .99 0h4.02A.99.99 0 0 1 6 1.003v4.994C6 6.551 5.549 7 5.01 7H.99A.99.99 0 0 1 0 5.997zm7 0C7 .45 7.451 0 7.99 0h4.02A.99.99 0 0 1 13 1.003v4.994C13 6.551 12.549 7 12.01 7H7.99A.99.99 0 0 1 7 5.997zm7 0C14 .45 14.451 0 14.99 0h4.02A.99.99 0 0 1 20 1.003v4.994C20 6.551 19.549 7 19.01 7h-4.02A.99.99 0 0 1 14 5.997z"
                  ></path>
                </svg>
                Pens
              </a>
              <a
                href="/search/projects?q="
                class="px-3 py-1 rounded bg-[#4F5465] text-white text-sm hover:bg-[#5A5F73] transition transform active:translate-y-0.5 flex items-center"
              >
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current w-3 mr-1.5"
                  :class="{ 'text-[#FFDD40]': activeTab === 'projects' }"
                >
                  <path
                    d="M7 .995C7 .445 7.447 0 7.999 0H19c.552 0 .999.456.999.995v8.01c0 .55-.447.995-.999.995H8C7.447 10 7 9.544 7 9.005zm0 11.003c0-.551.447-.998.999-.998H19c.552 0 .999.446.999.998v7.004c0 .551-.447.998-.999.998H8A.998.998 0 0 1 7 19.002zM0 .992C0 .444.451 0 .99 0h4.02c.546 0 .99.455.99.992v18.016a.996.996 0 0 1-.99.992H.99a.999.999 0 0 1-.99-.992z"
                  ></path>
                </svg>
                Projects
              </a>
              <a
                href="/search/collections?q="
                class="px-3 py-1 rounded bg-[#4F5465] text-white text-sm hover:bg-[#5A5F73] transition transform active:translate-y-0.5 flex items-center"
              >
                <svg
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current w-3 mr-1.5"
                  :class="{ 'text-[#AE63E4]': activeTab === 'collections' }"
                >
                  <rect height="9.64" rx="1" width="9.64" y="10.36"></rect>
                  <rect
                    height="9.64"
                    rx="1"
                    width="9.64"
                    x="10.36"
                    y="10.36"
                  ></rect>
                  <rect height="9.64" rx="1" width="9.64"></rect>
                  <rect height="9.64" rx="1" width="9.64" x="10.36"></rect>
                </svg>
                Collections
              </a>
            </div>
          </div>
        </div>

        <div class="SearchPage_content">
          <!-- 搜尋結果 -->
          <div v-if="isContent" class="SearchPage_result_container">
            <div
              class="SearchPage_result_grid grid [grid-template-columns:repeat(auto-fill,minmax(30%,1fr))] gap-12"
            >
              <div
                v-for="card in currentPageCards"
                :key="card.id"
                class="card bg-cyan-500 aspect-[4/3]"
              >
                {{ card.title }}
              </div>

              <!-- <div class="card bg-cyan-500 aspect-[4/3]">hello</div>
              <div class="card bg-cyan-500 aspect-[4/3]">hello</div>
              <div class="card bg-cyan-500 aspect-[4/3]">hello</div>
              <div class="card bg-cyan-500 aspect-[4/3]">hello</div>
              <div class="card bg-cyan-500 aspect-[4/3]">hello</div>
              <div class="card bg-cyan-500 aspect-[4/3]">hello</div> -->
            </div>
            <nav
              class="SearchPage_button_nav flex justify-center align-center mt-20 mb-12 gap-3"
            >
              <button
                v-if="currentPage > 1"
                @click="prevPage"
                class="px-4 py-3 bg-[#444857] hover:bg-[#5A5F73] rounded-sm flex gap-1"
              >
                <svg
                  viewBox="-100.9 99.1 61.9 105.9"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current w-2"
                >
                  <path
                    d="m-98.2 158.8 43.5 43.5c1.7 1.7 4 2.7 6.5 2.7s4.8-1 6.5-2.7 2.7-4 2.7-6.5-1-4.8-2.7-6.5l-37.2-37.2 37.2-37.2c1.7-1.7 2.7-4 2.7-6.5s-1-4.8-2.6-6.5c-1.8-1.9-4.2-2.8-6.6-2.8-2.3 0-4.6.9-6.5 2.6-11.5 11.4-41.2 41-43.3 43l-.2.2c-3.6 3.6-3.6 10.3 0 13.9z"
                  ></path>
                </svg>
                Prev
              </button>
              <button
                v-if="currentPage < totalPages"
                @click="nextPage"
                class="px-4 py-3 bg-[#444857] hover:bg-[#5A5F73] rounded-sm mr-2 flex gap-1"
              >
                Next
                <svg
                  viewBox="-100.9 99.1 61.9 105.9"
                  xmlns="http://www.w3.org/2000/svg"
                  class="fill-current w-2"
                >
                  <path
                    d="m-41.7 145.3-43.5-43.5c-1.7-1.7-4-2.7-6.5-2.7s-4.8 1-6.5 2.7-2.7 4-2.7 6.5 1 4.8 2.7 6.5L-61 152l-37.2 37.2c-1.7 1.7-2.7 4-2.7 6.5s1 4.8 2.6 6.5c1.8 1.9 4.2 2.8 6.6 2.8 2.3 0 4.6-.9 6.5-2.6 11.5-11.4 41.2-41 43.3-43l.2-.2c3.6-3.6 3.6-10.4 0-13.9z"
                  ></path>
                </svg>
              </button>
            </nav>
          </div>
          <!-- 搜尋前提示 -->
          <div
            v-else-if="searchKeyword === ''"
            class="SearchPage_message_root max-w-xl p-8 mb-5 mx-auto bg-[#2C303A] text-center rounded"
          >
            <h1 class="mb-2 leading-[1.1] font-archivo text-4xl">Search</h1>
            <p>
              Enter a search term above to find for Codecaines or Collections.
            </p>
          </div>
          <!-- 搜尋結果為空的提示 -->
          <div
            v-else-if="isEmptySearchResult"
            class="SearchPage_message_root max-w-xl p-8 mb-5 mx-auto bg-[#2C303A] text-center rounded"
          >
            <h1 class="mb-2 leading-[1.1] font-archivo text-4xl">No Results</h1>
            <p>
              Sorry, we couldn’t find any results matching “{{
                searchKeyword
              }}”.
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
