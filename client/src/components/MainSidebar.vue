<template>
  <div>
    <header
      class="relative top-0 left-0 h-screen transition-all duration-300 bg-[#1E1F26] text-amber-50"
      :class="{ 'w-[160px]': isSidebarOpen, 'w-0': !isSidebarOpen }"
    >
      <div class="absolute top-4 -right-4 z-10">
        <button
          @click="toggleSidebar"
          class="flex items-center justify-center w-4 h-7 bg-[#5A5F73] text-amber-50 rounded-r cursor-pointer transition-all duration-300"
        >
          <span :class="{ 'rotate-180': isSidebarOpen }">➤</span>
        </button>
        <div
          @click="toggleSidebar"
          class="inner-sidebar absolute w-3 right-[5px] -top-[15px] h-screen opacity-25 -z-10 cursor-pointer bg-[repeating-linear-gradient(45deg,hsl(226.15deg,12.04%,57.65%),hsl(226.15deg,12.04%,57.65%)_2px,hsl(228deg,12.2%,40.2%)_0,hsl(228deg,12.2%,40.2%)_4px)] hover:opacity-50 hover:transition-opacity hover:duration-700 hover:ease-in-out text-zinc-950"
          :class="{ hidden: isSidebarOpen }"
        ></div>
      </div>

      <div
        class="h-full overflow-y-auto overflow-x-hidden"
        :class="{ hidden: !isSidebarOpen }"
      >
        <div>
          <div class="img">
            <h1 class="cursor-pointer" @click="Home"></h1>
          </div>
        </div>
        <nav class="">
          <div class="nav">
            <h2 class="cursor-pointer" @click="Yourwork">CREATE</h2>
            <ul class="">
              <li class="cursor-pointer hover:bg-[#131417]" @click="Pen">
                ✏️ Pain
              </li>
            </ul>
          </div>
          <div class="bar">
            <div class="p cursor-pointer hover:bg-[#131417]" @click="Yourwork">
              Your Work
            </div>
          </div>
          <div class="bar">
            <div class="p cursor-pointer hover:bg-[#131417]" @click="Following">
              Following
            </div>
            <div class="p cursor-pointer hover:bg-[#131417]" @click="Trending">
              Trending
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const Yourwork = () => {
  router.push("/your-work");
};
const Following = () => {
  router.push("/following");
};
const Trending = () => {
  router.push("/trending");
};
const Pen = () => {
  router.push("/pen");
};
const Home = () => {
  router.push("/");
};

const isSidebarOpen = ref(true);

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<style scoped>
.inner-sidebar:hover {
  animation: fadeOut 0.5s ease-in-out infinite;
}
@keyframes fadeOut {
  0% {
    top: -15px;
  }
  100% {
    top: -30px;
  }
}

li {
  padding: 0.75rem 0.875rem;
}
.img {
  width: 100%;
  height: 50px;
  padding: 0 12px 0 12px;
  position: relative;
  justify-content: center;
}
h1 {
  background-image: url(../assets/codepain.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.nav {
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0 1rem;
  font-size: 1.2rem;
  color: #fff;
  background-color: #1e1f26;
}
h2 {
  font-size: 9px;
  padding-bottom: 9px;
  position: relative;
}
h2:hover {
  background: linear-gradient(
    90deg,
    #6495ed,
    #f2c464,
    #c51077,
    #34c759,
    #6495ed,
    #f2c464,
    #c51077,
    #34c759,
    #6495ed
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow 4s linear infinite;
}

@keyframes rainbow {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 200px 0;
  }
}
h2::after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  content: "";
  height: 3px;
  border-radius: 5px 5px 0 0;
  z-index: 1;
  background-image: linear-gradient(
    90deg,
    #4567b7,
    #f7dc6f,
    #9c3f8f,
    #34c759,
    #4567b7,
    #f7dc6f,
    #9c3f8f,
    #34c759,
    #4567b7
  );
  background-size: 200% auto;
}
h2:hover::after {
  animation: rainbow 4s linear infinite;
}

ul {
  background-color: #2c303a;
  font-weight: 500;
  font-size: 1.125rem;
  text-align: left;
  margin-bottom: 1px;
  display: block;
  width: 100%;
  transition: 0.2s ease;
  cursor: pointer;
  border-radius: 0 0 0.25rem 0.25rem;
}
.bar {
  margin-top: 6px;
}
.p {
  padding: 7.25px 15.625px;
  font-size: 14.41px;
}
</style>
