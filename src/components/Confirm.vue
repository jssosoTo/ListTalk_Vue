<script setup lang="ts">
import AlertMask from '@/AlertMask.vue'
import { useAlertStore } from '@/stores/alert'
import { AiOutlineClose } from 'vue-icons-plus/ai'

const alertStore = useAlertStore()
</script>

<template>
  <AlertMask :is-bottom="true">
    <div
      class="absolute -top-2 -translate-y-full alert flex items-center gap-4 transition-all justify-between"
      :class="[
        { 'left-2': alertStore.isConfirm },
        { '-left-60': !alertStore.isConfirm },
      ]"
    >
      <span>{{ alertStore.message }}</span>
      <span
        class="withdraw cursor-pointer"
        style="color: var(--main-g-color)"
        @click="alertStore.withdrawOperation"
        >撤销</span
      >
      <AiOutlineClose class="cursor-pointer close" />
    </div>
  </AlertMask>
</template>

<style scoped>
.alert {
  background-color: #1b1b1b;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  box-shadow: 0 3px 15px 2px rgba(0, 0, 0, 0.2);
}
.alert svg {
  color: #919191;
}

.withdraw,
.close {
  font-size: 0.95rem;
  line-height: 0.95rem;
  position: relative;
}

.withdraw:hover::after,
.close:hover::after {
  content: '';
  position: absolute;
  z-index: -1;
  width: 140%;
  height: 160%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: #3d3d3d;
}
</style>
