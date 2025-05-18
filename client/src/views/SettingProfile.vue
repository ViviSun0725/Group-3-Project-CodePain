<template>
  <div class="flex flex-col h-full w-full bg-[#131417] p-6">
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,380px)_1fr] flex-1 gap-8 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">Profile Image</h3>
      </div>
      <div class="w-full max-w-180 h-full min-h-16 bg-[#1E1F26] rounded">1</div>
    </section>
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,380px)_1fr] flex-1 gap-8 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">About You</h3>
        <p class="text-sm text-gray-500">
          Let others know more about you by providing optional information.
        </p>
      </div>
      <div class="w-full max-w-180 h-full min-h-16 bg-[#1E1F26] rounded">2</div>
    </section>
    <section
      class="grid grid-cols-1 md:grid-cols-[minmax(210px,380px)_1fr] flex-1 gap-8 mb-8"
    >
      <div>
        <h3 class="text-xl font-bold mb-2">Profile Links</h3>
        <p class="text-sm text-gray-500">
          You can add up to three links to your profile. Maybe you’d like to add
          your portfolio or GitHub profile?
        </p>
      </div>
      <div class="w-full max-w-180 h-full min-h-16 bg-[#1E1F26] rounded">3</div>
    </section>
  </div>
</template>
<style scoped></style>
