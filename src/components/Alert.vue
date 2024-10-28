<script setup lang="ts">
import AlertMask from '@/AlertMask.vue'
import { useAlertStore } from '@/stores/alert'
import { AiFillInfoCircle } from 'vue-icons-plus/ai'

const alertStore = useAlertStore()
</script>

<template>
  <AlertMask>
    <div
      class="absolute left-1/2 -translate-x-1/2 alert flex items-center gap-2 transition-all"
      :class="[
        { 'top-4': alertStore.isAlertShow },
        { '-top-20': !alertStore.isAlertShow },
      ]"
    >
      <AiFillInfoCircle /><span>{{ alertStore.message }}</span>
    </div>
  </AlertMask>
</template>

<style scoped>
.alert {
  background-color: white;
  color: black;
  padding: 0.4rem 1rem;
  border-radius: 15px;
  box-shadow: 0 3px 15px 2px rgba(0, 0, 0, 0.2);
}
.alert svg {
  color: rgb(22, 119, 255);
}
</style>
