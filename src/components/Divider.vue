<script setup lang="ts">
import { AiFillCodeSandboxCircle } from 'vue-icons-plus/ai'
</script>

<template>
  <div class="flex items-center gap-4 justify-between divider">
    <div></div>
    <AiFillCodeSandboxCircle />
    <div></div>
  </div>
</template>

<style scoped>
.divider svg {
  width: 0.9rem;
  color: var(--shade-border-color);
}

.divider div {
  flex: 1;
  height: 1px;
  background-color: var(--shade-border-color);
}
</style>
