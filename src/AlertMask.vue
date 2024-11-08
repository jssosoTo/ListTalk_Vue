<script setup lang="ts">
const { isBottom } = defineProps<{ isBottom: boolean }>()
</script>

<template>
  <div
    class="absolute left-1/2 bg-black bg-opacity-10 w-full -translate-x-1/2 z-10 flex justify-center items-start"
    :class="[{ 'top-0': !isBottom }, { 'bottom-0': isBottom }]"
  >
    <slot></slot>
  </div>
</template>
