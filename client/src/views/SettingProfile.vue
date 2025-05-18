<template>
  <div class="flex flex-col h-full w-full bg-[#131417] p-6">
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,330px)_1fr] flex-1 gap-8 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">Profile Image</h3>
      </div>
      <div
        class="w-full max-w-160 h-full min-h-16 bg-[#1E1F26] rounded flex flex-row gap-4 py-6"
      >
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="Avatar Preview"
          class="w-24 h-24 object-cover border-2 border-gray-600 mb-2"
        />
        <div
          v-else
          class="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mb-2"
        >
          無預覽
        </div>
        <input
          type="file"
          accept="image/*"
          @change="onAvatarChange"
          class="block file:rounded-full file:bg-blue-600 file:text-white file:px-4 file:py-2 file:border-0 file:cursor-pointer hover:file:bg-blue-700 transition-colors duration-200"
        />
      </div>
    </section>
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,330px)_1fr] flex-1 gap-8 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">About You</h3>
        <p class="text-sm text-gray-500">
          Let others know more about you by providing optional information.
        </p>
      </div>
      <div class="w-full max-w-160 h-full min-h-16 bg-[#1E1F26] rounded">2</div>
    </section>
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,330px)_1fr] flex-1 gap-8 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">Profile Links</h3>
        <p class="text-sm text-gray-500">
          You can add up to three links to your profile. Maybe you’d like to add
          your portfolio or GitHub profile?
        </p>
      </div>
      <div class="w-full max-w-160 h-full min-h-16 bg-[#1E1F26] rounded">3</div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const avatarUrl = ref("");

function onAvatarChange(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      avatarUrl.value = event.target.result;
    };
    reader.readAsDataURL(file);
  }
}
</script>

<style scoped></style>
