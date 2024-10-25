<script setup lang="ts">
import ListContainer from '@/components/ListContainer.vue'
import TaskItem from '@/components/TaskItem.vue'
</script>

<template>
  <ListContainer title="今天" :is-task-num-show="true">
    <TaskItem />
  </ListContainer>
</template>
