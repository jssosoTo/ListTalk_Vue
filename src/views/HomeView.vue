<script setup lang="ts">
import ListContainer from '@/components/ListContainer.vue'
import TaskItem from '@/components/TaskItem.vue'
import { useReloadStore } from '@/stores/reload'
import { ref } from 'vue'

const lists = ref(JSON.parse(localStorage.getItem('allLists') || '[]'))
const reloadStore = useReloadStore()

function reload() {
  lists.value = JSON.parse(localStorage.getItem('allLists') || '[]')
}

reloadStore.changeReload(reload)
</script>

<template>
  <ListContainer title="今天" @reload="reload" :is-task-num-show="true">
    <TaskItem
      v-for="list in lists"
      :key="list.id"
      :title="list.title"
      :desc="list.desc"
      :date="list.date"
      :premier="list.premier"
    />
  </ListContainer>
</template>
