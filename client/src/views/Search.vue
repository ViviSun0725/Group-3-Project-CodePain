<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import YourWorkIcon from "@/components/icons/YourWorkIcon.vue";
import PensIcon from "@/components/icons/PensIcon.vue";
import ProjectsIcon from "@/components/icons/ProjectsIcon.vue";
import CollectionIcon from "@/components/icons/CollectionIcon.vue";
import LeftArrowIcon from "@/components/icons/LeftArrowIcon.vue";
import RightArrowIcon from "@/components/icons/RightArrowIcon.vue";

const route = useRoute();
const router = useRouter();
const inputKeyword = ref(""); // 使用者輸入的內容（v-model 綁定 input）
const searchKeyword = ref(""); // 用來搜尋的關鍵字
const itemsPerPage = 6;
const currentPage = ref(1); // 預設當前頁面為第一頁
const allCards = ref();

const activeTab = computed(() => route.params.category || "pens");

const tabColors = {
  pens: "#0EBEFF",
  projects: "#FFDD40",
  collections: "#AE63E4",
};

// TODO：未來改成 cursor-based 自動載入下一頁
// 假資料
const fakeData = {
  pens: [
    {
      id: "pen-1",
      title: "CSS Grid Layout",
      description: "A demo of responsive grid using modern CSS layout.",
      author: "Alice Nguyen",
    },
    {
      id: "pen-2",
      title: "HTML Button Styles",
      description: "Various button designs using pure HTML and CSS.",
      author: "Bob Chen",
    },
    {
      id: "pen-3",
      title: "JavaScript Timer",
      description: "Simple countdown timer built with vanilla JavaScript.",
      author: "Charlie Wu",
    },
    {
      id: "pen-4",
      title: "Vue Basics Demo",
      description: "A basic demo showing Vue 3 reactivity and template usage.",
      author: "Dora Lin",
    },
    {
      id: "pen-5",
      title: "TailwindCSS Card",
      description:
        "Card UI component styled using Tailwind CSS utility classes.",
    },
    {
      id: "pen-6",
      title: "Form Validation",
      description: "Frontend form validation with JavaScript events.",
    },
    {
      id: "pen-7",
      title: "CSS Flex Examples",
      description: "Collection of flexbox layout examples with CSS only.",
    },
    {
      id: "pen-8",
      title: "HTML Table Style",
      description: "Responsive and styled table using HTML and CSS.",
    },
    {
      id: "pen-9",
      title: "JS Carousel",
      description: "A lightweight image slider built with JavaScript.",
    },
    {
      id: "pen-10",
      title: "Vue Reactive List",
      description: "Reactive list rendering example in Vue.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Portfolio Website",
      description: "Personal portfolio site to showcase projects and skills.",
    },
    {
      id: "proj-2",
      title: "Vue Weather App",
      description: "Weather forecast app using Vue and public API.",
    },
    {
      id: "proj-3",
      title: "Blog Platform",
      description: "A simple blogging system with Markdown support.",
    },
    {
      id: "proj-4",
      title: "React Task Manager",
      description: "To-do list application built with React.",
    },
    {
      id: "proj-5",
      title: "Node.js API Server",
      description: "RESTful API backend built with Express and Node.js.",
    },
    {
      id: "proj-6",
      title: "E-commerce Dashboard",
      description: "Admin panel to manage orders, users, and products.",
    },
    {
      id: "proj-7",
      title: "Login Auth System",
      description: "Authentication system with JWT and session handling.",
    },
    {
      id: "proj-8",
      title: "Interactive Resume",
      description: "Resume site with animations and interactive UI.",
    },
    {
      id: "proj-9",
      title: "Chat App with Socket.io",
      description: "Real-time chat application with web sockets.",
    },
    {
      id: "proj-10",
      title: "Markdown Note Editor",
      description: "Editor to write and preview markdown notes.",
    },
    {
      id: "proj-11",
      title: "Project Tracker",
      description: "Kanban-style task tracker with drag-and-drop.",
    },
    {
      id: "proj-12",
      title: "Vue 3 + Tailwind Template",
      description: "A starter template using Vue 3 and Tailwind CSS.",
    },
  ],
  collections: [
    {
      id: "coll-1",
      title: "Frontend UI Snippets",
      description: "A collection of reusable HTML/CSS UI patterns.",
    },
    {
      id: "coll-2",
      title: "JavaScript Animations",
      description: "Snippets for DOM-based animations with JS.",
    },
    {
      id: "coll-3",
      title: "Vue Component Library",
      description: "Commonly used Vue 3 components in one place.",
    },
    {
      id: "coll-4",
      title: "CSS Framework Demos",
      description: "Examples using Tailwind, Bootstrap, and more.",
    },
    {
      id: "coll-5",
      title: "Design Systems",
      description: "Shared design principles, styles, and tokens.",
    },
    {
      id: "coll-6",
      title: "Favorite Templates",
      description: "Handpicked templates for projects and portfolios.",
    },
    {
      id: "coll-7",
      title: "Weekly Code Picks",
      description: "Interesting pens, projects, and patterns this week.",
    },
    {
      id: "coll-8",
      title: "JS One-liners",
      description: "Useful single-line JavaScript utilities.",
    },
    {
      id: "coll-9",
      title: "Button Hover Effects",
      description: "Creative hover styles for buttons.",
    },
    {
      id: "coll-10",
      title: "Form Examples",
      description: "Collection of login, signup, and contact form UIs.",
    },
  ],
};

// 初次載入時觸發搜尋
onMounted(() => {
  const q = route.query.q || "";
  searchKeyword.value = q;
});

// 搜尋結果
const filteredCards = computed(() => {
  if (!searchKeyword.value.trim()) return [];
  const keywords = searchKeyword.value.trim().toLowerCase().split(/\s+/);

  return allCards.value.filter((card) => {
    const title = card.title.toLowerCase();
    const description = card.description?.toLowerCase() || "";
    const author = card.author?.toLowerCase() || "";
    return keywords.every(
      (keyword) =>
        title.includes(keyword) ||
        description.includes(keyword) ||
        author.includes(keyword)
    );
  });
});

const onSearchSubmit = () => {
  console.log(inputKeyword.value);
  currentPage.value = 1;

  // searchKeyword.value = inputKeyword.value; //  執行搜尋
  // searchKeyword.value = searchKeyword.value.toLowerCase();
  searchKeyword.value = inputKeyword.value.toLowerCase();

  router.push({
    path: `/search/${route.params.category || "pens"}`,
    query: { q: inputKeyword.value },
  });
};

// 計算總頁數
const totalPages = computed(() =>
  Math.ceil(filteredCards.value.length / itemsPerPage)
);

// 目前頁面要顯示的卡片
const currentPageCards = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredCards.value.slice(start, start + itemsPerPage);
});

// 有無搜尋結果 (v-if v-else-if 切換訊息)
const isContent = computed(() => currentPageCards.value.length > 0);

const isEmptySearchResult = computed(() => {
  return searchKeyword.value.trim() !== "" && filteredCards.value.length === 0;
});

watchEffect(() => {
  const category = route.params.category || "pens";
  allCards.value = fakeData[category] || [];

  if (route.query.q !== undefined) {
    inputKeyword.value = route.query.q;
    searchKeyword.value = route.query.q;
  }
  currentPage.value = 1;
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
                <YourWorkIcon class="fill-current w-3 mr-1.5" />
                Your Work
              </a>
              <a
                href="/search/pens?q="
                class="px-3 py-1 rounded bg-[#4F5465] text-white text-sm hover:bg-[#5A5F73] transition transform active:translate-y-0.5 flex items-center"
              >
                <PensIcon
                  class="fill-current w-3 mr-1.5"
                  :class="{ 'text-[#0EBEFF]': activeTab === 'pens' }"
                />
                Pens
              </a>
              <a
                href="/search/projects?q="
                class="px-3 py-1 rounded bg-[#4F5465] text-white text-sm hover:bg-[#5A5F73] transition transform active:translate-y-0.5 flex items-center"
              >
                <ProjectsIcon
                  class="fill-current w-3 mr-1.5"
                  :class="{ 'text-[#FFDD40]': activeTab === 'projects' }"
                />
                Projects
              </a>
              <a
                href="/search/collections?q="
                class="px-3 py-1 rounded bg-[#4F5465] text-white text-sm hover:bg-[#5A5F73] transition transform active:translate-y-0.5 flex items-center"
              >
                <CollectionIcon
                  class="fill-current w-3 mr-1.5"
                  :class="{ 'text-[#AE63E4]': activeTab === 'collections' }"
                />
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
              <!-- 作品卡 -->
              <div
                v-for="card in currentPageCards"
                :key="card.id"
                class="card bg-cyan-500 aspect-[4/3]"
              >
                <div>{{ card.title }}</div>
                <div>{{ card.description }}</div>
              </div>
            </div>
            <nav
              class="SearchPage_button_nav flex justify-center align-center mt-20 mb-12 gap-3"
            >
              <button
                v-if="currentPage > 1"
                @click="prevPage"
                class="px-4 py-3 bg-[#444857] hover:bg-[#5A5F73] rounded-sm flex gap-1"
              >
                <LeftArrowIcon class="fill-current w-2" />
                Prev
              </button>
              <button
                v-if="currentPage < totalPages"
                @click="nextPage"
                class="px-4 py-3 bg-[#444857] hover:bg-[#5A5F73] rounded-sm mr-2 flex gap-1"
              >
                Next
                <RightArrowIcon class="fill-current w-2" />
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
