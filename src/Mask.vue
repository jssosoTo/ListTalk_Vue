<script setup>
import { useMaskStore } from '@/stores/mask'

const maskStore = useMaskStore()
</script>

<template>
  <div
    v-if="maskStore.isMaskShow"
    @click="maskStore.closeMask"
    class="absolute top-1/2 left-1/2 h-full bg-black bg-opacity-10 w-full -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-start"
  >
    <slot></slot>
  </div>
</template>
