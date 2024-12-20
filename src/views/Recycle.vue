<script setup lang="ts">
import PopConfirm from '@/components/PopConfirm.vue'
import { useAlertStore } from '@/stores/alert'
import type { ListProp, TranslateTextType } from '@/types'
import dayjs from 'dayjs'
import { computed, inject, ref } from 'vue'
import { FcFullTrash } from 'vue-icons-plus/fc'
import { PiTrashSimple } from 'vue-icons-plus/pi'
import { RiArrowGoBackLine } from 'vue-icons-plus/ri'

const today: string = dayjs().format('YYYY-MM-DD HH:mm:ss')
const filterList: ListProp[] = JSON.parse(
  localStorage.getItem('allLists') || '[]',
).filter((item: ListProp) => !item.clearTime || item.clearTime > today)
const allList = ref(filterList)
const alertStore = useAlertStore()
const translateText = inject<TranslateTextType>(
  'translateText',
  (title: string) => title,
)

function withdraw(id: number) {
  const newList = allList.value.slice()
  const item = newList.find(item => item.id === id) as ListProp
  item.checked = false
  item.finishedTime = null
  localStorage.setItem('allLists', JSON.stringify(newList))
  allList.value = newList
  alertStore.openAlert('任务已撤销', id, true)
}

function deleteItem(id: number) {
  const newList: ListProp[] = allList.value
    .slice()
    .filter(item => item.id !== id)
  localStorage.setItem('allLists', JSON.stringify(newList))
  allList.value = newList
  alertStore.openAlert('任务已永久删除', id, true)
}

function clearTrash() {
  const newList: ListProp[] = allList.value
    .slice()
    .filter(item => !item.checked)
  localStorage.setItem('allLists', JSON.stringify(newList))
  allList.value = newList
  alertStore.openAlert('回收站已清空', null, true)
}

const checkedList = computed<ListProp[]>(() =>
  allList.value.filter(item => item.checked),
)
</script>
<!-- @click.capture="isTrashModalOpen = false" -->

<template>
  <div class="px-24 pt-8 pb-4 h-full flex flex-col overflow-y-auto">
    <h1 class="text-xl">{{ translateText('confirmedTasks') }}</h1>
    <div class="title flex items-center justify-between mt-4">
      <h2>{{ translateText('recycleTitle') }}</h2>
      <div class="btns">
        <PopConfirm
          :title="translateText('recyclePopConfirmTitle')"
          @on-confirm="clearTrash"
        >
          <button class="flex items-center gap-2 fnBtn">
            <FcFullTrash />
            {{ translateText('clearRecycle') }}
          </button>
        </PopConfirm>
      </div>
    </div>
    <table class="w-full text-left relative">
      <thead class="sticky -top-8 header">
        <tr>
          <th>{{ translateText('date') }}</th>
          <th>{{ translateText('title') }}</th>
          <th>{{ translateText('finishedDate') }}</th>
          <th>{{ translateText('autoDelete') }}</th>
          <th>{{ translateText('operation') }}</th>
        </tr>
      </thead>
      <TransitionGroup tag="tbody">
        <tr v-for="item of checkedList" :key="item.id">
          <td>{{ item.date }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.finishedTime }}</td>
          <td>{{ item.clearTime }}</td>
          <td class="flex items-center gap-4 options">
            <button @click="withdraw(item.id!)">
              <RiArrowGoBackLine />
            </button>
            <button @click="deleteItem(item.id!)">
              <PiTrashSimple />
            </button>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>
</template>

<style scoped>
.header {
  z-index: 1;
  background-color: var(--bg);
}

.fnBtn {
  padding: 0.4rem 1rem;
  border-radius: 5px;
}

.fnBtn:hover {
  background-color: var(--btn-color);
  color: var(--btn-text);
}

th,
td {
  padding: 0.8rem 0.5rem;
}

td {
  border-top: 1px solid var(--text);
}

table {
  border: 1px solid var(--text);
  border-radius: 10px;
  border-collapse: separate;
}

.options button {
  position: relative;
}

.options button:hover::after {
  content: '';
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--shade-bg);
}

.v-move,
.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-leave-active {
  position: absolute;
}
</style>
