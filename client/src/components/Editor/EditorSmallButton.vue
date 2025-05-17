<template>
  <button type="button" class="bg-[#43454f] py-[3px] px-[7px] text-[12px] leading-4 rounded-xs" @click="$emit('buttonClick')">
    <slot></slot>
  </button>
</template>

<script setup>
  defineEmits(['buttonClick'])
</script>