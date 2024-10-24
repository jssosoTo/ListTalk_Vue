<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  pjtName: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['selectPjt'])
</script>

<template>
  <div
    @click="emit('selectPjt', id, title)"
    class="px-4 py-1 transition-all"
    :class="{ selected: id === pjtName }"
  >
    {{ title }}
  </div>
</template>

<style scoped>
.selected {
  background-color: var(--shade-bg) !important;
}

div:hover {
  cursor: pointer;
  padding-left: 1.4rem;
  background-color: var(--shade-bg);
}
</style>
