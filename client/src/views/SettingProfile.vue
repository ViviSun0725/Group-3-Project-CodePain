<template>
  <div class="h-full w-full bg-[#131417] p-6 grid grid-rows-12">
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,330px)_1fr] row-span-3 flex-1 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">Profile Image</h3>
      </div>
      <div
        class="w-full max-w-160 h-full min-h-16 bg-[#1E1F26] rounded-lg flex flex-row gap-4 p-6"
      >
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="Avatar Preview"
          class="w-28 h-28 object-cover border-2 border-gray-600 rounded"
        />
        <div
          v-else
          class="w-28 h-28 bg-gray-700 flex items-center justify-center text-gray-400 rounded"
        >
          無預覽
        </div>
        <div>
          <label class="block">
            <button
              type="button"
              class="rounded bg-[#444857] text-white px-4 py-2 border-0 cursor-pointer hover:bg-[#5A5F73] transition-colors duration-200"
              @click="fileInput && fileInput.click()"
            >
              選擇檔案
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="onAvatarChange"
              class="hidden"
            />
          </label>
          <div class="mt-2 flex flex-col items-start gap-2 min-h-6">
            <div class="flex flex-row items-center gap-2 w-full">
              <button
                v-if="fileName"
                @click="clearFile"
                type="button"
                class="rounded bg-[#444857] text-white px-4 py-2 border-0 cursor-pointer hover:bg-[#5A5F73] transition-colors duration-200"
              >
                清除
              </button>
              <span v-if="fileName">{{ fileName }}</span>
              <span v-else class="text-gray-400">未選擇檔案</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,330px)_1fr] row-span-5 flex-1 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">About You</h3>
        <p class="text-sm text-gray-500">
          Let others know more about you by providing optional information.
        </p>
      </div>
      <div class="w-full max-w-160 h-full min-h-16 bg-[#1E1F26] rounded-lg">
        2
      </div>
    </section>
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,330px)_1fr] row-span-4 flex-1 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">Profile Links</h3>
        <p class="text-sm text-gray-500">
          You can add up to three links to your profile. Maybe you’d like to add
          your portfolio or GitHub profile?
        </p>
      </div>
      <div
        class="w-full max-w-160 h-full min-h-16 bg-[#1E1F26] rounded-lg flex flex-col justify-center gap-4 p-6"
      >
        <div
          v-for="(link, idx) in profileLinks"
          :key="idx"
          class="flex flex-col"
        >
          <span class="text-white text-sm">Link #{{ idx + 1 }}</span>
          <input
            v-model="profileLinks[idx]"
            type="text"
            :placeholder="`連結 ${idx + 1}`"
            class="w-full px-3 py-2 rounded bg-white text-black border-2 border-gray-600 focus:outline-none focus:border-[#05DF72] transition"
            maxlength="100"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const avatarUrl = ref("");
const fileInput = ref(null);
const fileName = ref("");
const profileLinks = ref(["", "", ""]);

function onAvatarChange(e) {
  const file = e.target.files[0];
  if (file) {
    fileName.value = file.name;
    const reader = new FileReader();
    reader.onload = (event) => {
      avatarUrl.value = event.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    fileName.value = "";
    avatarUrl.value = "";
  }
}

function clearFile() {
  avatarUrl.value = "";
  fileName.value = "";
  if (fileInput.value) fileInput.value.value = "";
}
</script>

<style scoped></style>
