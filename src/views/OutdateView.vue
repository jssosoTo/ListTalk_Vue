<script setup lang="ts">
import ListContainer from '@/components/ListContainer.vue'
import TaskItem from '@/components/TaskItem.vue'
import { useAlertStore } from '@/stores/alert'
import { useReloadStore } from '@/stores/reload'
import type { ListProp, TranslateTextType } from '@/types'
import dayjs from 'dayjs'
import { computed, inject, ref } from 'vue'
import { SiTicktick } from 'vue-icons-plus/si'

const lists = ref<ListProp[]>(
  JSON.parse(localStorage.getItem('allLists') || '[]'),
)
const today: string = dayjs().format('YYYY-MM-DD')
const reloadStore = useReloadStore()
const alertStore = useAlertStore()
const translateText = inject<TranslateTextType>(
  'translateText',
  (title: string) => title,
)

function reload() {
  lists.value = JSON.parse(localStorage.getItem('allLists') || '[]')
}

function checkedItem(id: number) {
  const newLists = lists.value.slice()
  const item = newLists.find(item => item.id === id) as ListProp
  item.checked = true
  item.finishedTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  item.clearTime = dayjs().add(30, 'days').format('YYYY-MM-DD HH:mm:ss')
  localStorage.setItem('allLists', JSON.stringify(newLists))
  lists.value = newLists
  alertStore.openAlert(translateText('finishedTask'), id)
}

function checkedAllItems() {
  const newLists: ListProp[] = lists.value.slice().map(list => {
    if (list.date! < today && !list.checked) {
      return {
        ...list,
        finishedTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        clearTime: dayjs().add(30, 'days').format('YYYY-MM-DD HH:mm:ss'),
        checked: true,
      }
    }
    return list
  })

  localStorage.setItem('allLists', JSON.stringify(newLists))
  lists.value = newLists
  alertStore.openAlert(translateText('allOutdatedFinished'), 6657, true)
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
    .filter(item => !item.checked && item.date! < today)
    .sort((a, b) => premierNum[a.premier!] - premierNum[b.premier!])
})
</script>

<template>
  <ListContainer
    :title="translateText('outdatedTasks')"
    :task-num="sortLists.length"
    @reload="reload"
    :is-task-num-show="true"
    :is-define-button="true"
    @define-click="checkedAllItems"
  >
    <template #button>
      <button><SiTicktick /></button>
      <span>{{ translateText('confirmAllTask') }}</span>
    </template>
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
