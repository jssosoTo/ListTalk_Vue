<script setup lang="ts">
import ListContainer from '@/components/ListContainer.vue'
import TaskItem from '@/components/TaskItem.vue'
import { useAlertStore } from '@/stores/alert'
import { useReloadStore } from '@/stores/reload'
import type { ListProp, PremierTypes } from '@/types'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

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
  const item = newLists.find(item => item.id === id) as ListProp
  item.checked = true
  item.finishedTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  item.clearTime = dayjs().add(30, 'days').format('YYYY-MM-DD HH:mm:ss')
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
    .filter(item => !item.checked)
    .sort(
      (a: ListProp, b: ListProp) =>
        premierNum[a.premier as PremierTypes] -
        premierNum[b.premier as PremierTypes],
    )
})
</script>

<template>
  <ListContainer
    title="今天"
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
