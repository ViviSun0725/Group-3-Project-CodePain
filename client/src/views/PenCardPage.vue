<template>
  <div class="p-6">
    <PenCard />
  </div>
</template>

<script>
import PenCard from '../components/penCard.vue';
import penCard from '../components/penCard.vue' // 注意：小寫

export default {
  components: {
    PenCard
  }
}
</script>