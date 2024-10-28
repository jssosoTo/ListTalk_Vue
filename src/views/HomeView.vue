<script setup lang="ts">
import ListContainer from '@/components/ListContainer.vue'
import TaskItem from '@/components/TaskItem.vue'
import { useReloadStore } from '@/stores/reload'
import { computed, ref } from 'vue'

const lists = ref(JSON.parse(localStorage.getItem('allLists') || '[]'))
const reloadStore = useReloadStore()

function reload() {
  lists.value = JSON.parse(localStorage.getItem('allLists') || '[]')
}

function checkedItem(id) {
  const newLists = lists.value.slice()
  newLists.find(item => item.id === id).checked = true
  localStorage.setItem('allLists', newLists)
  lists.value = newLists
}

reloadStore.changeReload(reload)

const sortLists = computed(() => {
  const premierNum = {
    first: 1,
    second: 2,
    third: 3,
    forth: 4,
  }
  return lists.value
    .slice()
    .filter(item => !item.checked)
    .sort((a, b) => premierNum[a.premier] - premierNum[b.premier])
})
</script>

<template>
  <ListContainer
    title="今天"
    :task-num="lists.length"
    @reload="reload"
    :is-task-num-show="true"
  >
    <TaskItem
      v-for="list in sortLists"
      @checkedItem="checkedItem"
      :key="list.id"
      :id="list.id"
      :title="list.title"
      :desc="list.desc"
      :date="list.date"
      :premier="list.premier"
      :type="list.type"
    />
  </ListContainer>
</template>
