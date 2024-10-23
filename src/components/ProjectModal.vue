<script setup lang="ts">
import Input from './Input.vue'
</script>

<template>
  <div>
    <h1 class="px-4 text-lg">新建项目</h1>
    <div class="hr"></div>
    <form @submit.prevent class="px-4">
      <Input label="名称" name="name" />
    </form>
  </div>
</template>
