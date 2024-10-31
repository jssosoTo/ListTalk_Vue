<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="relative">
    <slot name="button"></slot>
    <div
      class="modal absolute translate-y-2 left-1/2 -translate-x-1/2"
      :class="$attrs.class"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.modal {
  top: 100%;
}
</style>
