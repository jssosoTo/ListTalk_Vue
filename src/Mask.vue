<script setup lang="ts">
import { useMaskStore } from '@/stores/mask'

const maskStore = useMaskStore()
const emit = defineEmits<{ (e: 'closeModal'): void }>()
</script>

<template>
  <div
    v-if="maskStore.isMaskShow"
    @click="
      () => {
        emit('closeModal')
        maskStore.closeMask()
      }
    "
    class="absolute top-1/2 left-1/2 h-full bg-black bg-opacity-10 w-full -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-start"
  >
    <slot></slot>
  </div>
</template>
