<script setup lang="ts"></script>

<template>
  <div class="relative">
    <slot name="button"></slot>
    <div class="absolute -top-6 translate-y-1/4 left-1/2 -translate-x-1/2">
      <slot name="content"></slot>
    </div>
  </div>
</template>
