<script setup lang="ts"></script>

<template>
  <section class="rounded">
    <slot></slot>
  </section>
</template>

<style scoped>
section {
  background: var(--modal-bg);
  border: 1px solid lightgray;
}
</style>
