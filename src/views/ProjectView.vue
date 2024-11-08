<script setup lang="ts">
import ListContainer from '@/components/ListContainer.vue'
import TaskItem from '@/components/TaskItem.vue'
import { useAlertStore } from '@/stores/alert'
import { useReloadStore } from '@/stores/reload'
import type { ListProp, ProjectProp } from '@/types'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(route.params.id)
const projects: ProjectProp[] = JSON.parse(
  localStorage.getItem('projects') || '[]',
)
const lists = ref<ListProp[]>(
  JSON.parse(localStorage.getItem('allLists') || '[]'),
)
const reloadStore = useReloadStore()
const alertStore = useAlertStore()

function reload() {
  lists.value = JSON.parse(localStorage.getItem('allLists') || '[]')
}

function checkedItem(id: number) {
  const newLists: ListProp[] = lists.value.slice()
  newLists.find(item => item.id === id)!.checked = true
  localStorage.setItem('allLists', JSON.stringify(newLists))
  lists.value = newLists
  alertStore.openAlert('1个任务已完成', id)
}

reloadStore.changeReload(reload)

const sortLists = computed<ListProp[]>(() => {
  const premierNum = {
    first: 1,
    second: 2,
    third: 3,
    forth: 4,
  }
  return lists.value
    .slice()
    .filter(item => !item.checked && +id.value === +item.type!.value)
    .sort((a, b) => premierNum[a.premier!] - premierNum[b.premier!])
})

const title = computed<string>(
  () => projects.find(item => item.id === +id.value)?.title as string,
)

watch(
  () => route.params.id,
  () => {
    id.value = route.params.id
  },
)
</script>

<template :key="id">
  <ListContainer
    :title
    :task-num="sortLists.length"
    @reload="reload"
    :is-task-num-show="true"
  >
    <TaskItem
      v-for="list in sortLists"
      @checkedItem="checkedItem"
      :key="list.id"
      :id="list.id!"
      :title="list.title!"
      :desc="list.desc!"
      :date="list.date!"
      :premier="list.premier"
      :type="list.type!"
    />
  </ListContainer>
</template>
