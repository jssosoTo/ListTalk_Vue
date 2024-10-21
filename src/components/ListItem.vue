<script setup lang="ts">
defineProps({
  path: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  itemsNum: {
    type: Number,
    required: true,
  },
  Icon: {
    required: true,
  },
})
</script>

<template>
  <div style="font-size: 0.85rem">
    <RouterLink :to="path" class="flex items-center justify-between p-2">
      <div class="flex gap-2 items-center">
        <Icon style="width: 0.98rem" />
        <span>{{ title }}</span>
      </div>
      <div class="num" style="color: var(--shade-text)">{{ itemsNum }}</div>
    </RouterLink>
  </div>
</template>

<style scoped>
a:hover {
  background-color: var(--btn-color);
  border-radius: 5px;
}

.activePath a {
  background-color: #ffefe5;
  color: #a81f00;
  border-radius: 5px;
}

.activePath a .num {
  color: #dc4c3e;
}
</style>
