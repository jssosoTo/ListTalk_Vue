<script setup lang="ts">
import { computed, onMounted, ref, toValue, useTemplateRef } from 'vue'
import Dream from '@/assets/Dream.png'
import Divider from '@/components/Divider.vue'
import { IpSearch } from 'vue-icons-plus/ip'
import TaskItem from '@/components/TaskItem.vue'
import { useAlertStore } from '@/stores/alert'
import dayjs from 'dayjs'
import { useReloadStore } from '@/stores/reload'

defineProps({
  title: {
    type: String,
    required: true,
  },
  isTaskNumShow: {
    type: Boolean,
  },
  isDefineButton: {
    type: Boolean,
  },
  taskNum: {
    type: Number,
    required: true,
  },
})
const inputRef = useTemplateRef('input')
const text = ref('')
const lists = ref(JSON.parse(localStorage.getItem('allLists') || '[]'))
const alertStore = useAlertStore()
const reloadStore = useReloadStore()

function checkedItem(id: number) {
  const newLists = lists.value.slice()
  const item = newLists.find(item => item.id === id)
  item.checked = true
  item.finishedTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
  item.clearTime = dayjs().add(30, 'days').format('YYYY-MM-DD HH:mm:ss')
  localStorage.setItem('allLists', JSON.stringify(newLists))
  lists.value = newLists
  alertStore.openAlert('1个任务已完成', id)
}

function reload() {
  lists.value = JSON.parse(localStorage.getItem('allLists') || '[]')
}

reloadStore.changeReload(reload)

const filterLists = computed(() => {
  const list = toValue(lists)
  const deText = toValue(text)
  return list.filter(
    item => deText && !item.checked && item.title.includes(deText),
  )
})

onMounted(() => inputRef.value?.focus())
</script>

<template>
  <div class="h-full flex flex-col overflow-y-auto">
    <header class="px-2 py-4"></header>
    <main style="padding: 0 25%" class="flex-1 w-full mx-auto flex flex-col">
      <div class="sticky top-0 header">
        <h1 class="title">搜索</h1>
        <div class="Input">
          <button>
            <IpSearch />
          </button>
          <input ref="input" v-model="text" />
        </div>
      </div>
      <Divider class="mt-4" />
      <div class="flex-1 lists">
        <TaskItem
          v-for="list in filterLists"
          @checkedItem="checkedItem"
          :key="list.id"
          :id="list.id"
          :title="list.title"
          :desc="list.desc"
          :date="list.date"
          :premier="list.premier"
          :type="list.type"
        />
        <div v-if="!filterLists.length" class="mt-8">
          <div class="flex justify-center">
            <img :src="Dream" width="294" height="267" />
          </div>
          <div>
            <h2 class="text-center text-xl font-extrabold">
              To do or not to do
            </h2>
            <h4 v-show="text.length" class="text-center text-gray-400">
              没有与"<span class="text-red-600">{{
                text.length > 20 ? text.slice(0, 20) + '...' : text
              }}</span
              >"匹配的任务
            </h4>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.6rem;
  font-weight: 800;
}

.header {
  background-color: var(--bg);
}

.Input {
  width: 100%;
  margin-top: 1.2rem;
  border-radius: 1000px;
  padding: 0.6rem 0.4rem;
  padding-right: 0.6rem;
  background-color: transparent;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  box-shadow: 0 2px 10px 0px var(--shade-border-color);
}

.Input input {
  flex: 1;
  outline: none;
  background-color: transparent;
}
</style>
