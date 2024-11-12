<script setup lang="ts">
import {
  BsCalendar2Date,
  BsCalendar3,
  BsSearchHeartFill,
} from 'vue-icons-plus/bs'
import { MdAddCircle } from 'vue-icons-plus/md'
import ListItem from './ListItem.vue'
import { EpAlarmClock } from 'vue-icons-plus/ep'
import { useRoute } from 'vue-router'
import { GiRecycle } from 'vue-icons-plus/gi'
import { useMaskStore } from '@/stores/mask'
import Mask from '@/Mask.vue'
import Modal from './Modal.vue'
import Project from './Project.vue'
import { computed, inject, ref, toValue } from 'vue'
import { SiAboutdotme } from 'vue-icons-plus/si'
import dayjs from 'dayjs'
import { useReloadStore } from '@/stores/reload'
import type { ListProp, ProjectProp, TranslateTextType } from '@/types'

type ItemNumProp = {
  [key: string]: number | ItemNumProp
}

const route = useRoute()
const translateText = inject<TranslateTextType>(
  'translateText',
  (title: string) => title,
)
const thisDate = ref<string>(dayjs().format('YYYY-MM-DD'))
const projects = ref<ProjectProp[]>(
  JSON.parse(localStorage.getItem('projects') || '[]'),
)
const lists = ref<ListProp[]>(
  JSON.parse(localStorage.getItem('allLists') || '[]'),
)
const isModalShow = ref<boolean>(false)
const maskStore = useMaskStore()
const reloadStore = useReloadStore()

function openModal() {
  isModalShow.value = true
  maskStore.openMask()
}

function closeModal() {
  isModalShow.value = false
  maskStore.closeMask()
}

function reload() {
  projects.value = JSON.parse(localStorage.getItem('projects') || '[]')
  lists.value = JSON.parse(localStorage.getItem('allLists') || '[]')
}

reloadStore.changePermanentReload(reload)

const itemsNum = computed<ItemNumProp>(() => {
  const list: ListProp[] = toValue(lists)
  const project: ProjectProp[] = toValue(projects)
  const unChecked: ListProp[] = list.filter(item => !item.checked)
  const recycle: number = list.filter(item => item.checked).length
  const today: number = unChecked.length
  const outdate: number = unChecked.filter(
    item => item.date! < thisDate.value,
  ).length
  const projectsNum: ItemNumProp = Object.fromEntries(
    project.map((item: ProjectProp) => [
      item.id,
      unChecked.reduce((acc: number, cur: ListProp) => {
        if (cur.type!.value === item.id) {
          acc += 1
        }
        return acc
      }, 0),
    ]),
  )

  return {
    recycle,
    today,
    outdate,
    projectsNum,
  }
})
</script>

<template>
  <main class="flex-1 overflow-hidden mt-3 flex flex-col gap-1">
    <div class="flex justify-center gap-2 btn mx-3" @click="openModal">
      <MdAddCircle style="color: #dc4c3e" />
      <span>{{ translateText('addTask') }}</span>
    </div>
    <div v-if="false" class="flex items-center searchBtn mx-3">
      <BsSearchHeartFill style="width: 0.98rem" />
      <input class="flex-1 search" :placeholder="translateText('search')" />
    </div>
    <ul class="flex flex-col gap-2 mx-3" style="margin-top: 0.5rem">
      <li :class="{ activePath: route.path === '/search' }">
        <ListItem
          path="/search"
          :title="translateText('search')"
          :Icon="BsSearchHeartFill"
          :is-hidden-num="true"
          :itemsNum="0"
        />
      </li>
      <li :class="{ activePath: route.path === '/today' }">
        <ListItem
          path="/today"
          :title="translateText('today')"
          :Icon="BsCalendar3"
          :itemsNum="itemsNum.today"
        />
      </li>
      <li :class="{ activePath: route.path === '/outdate' }">
        <ListItem
          path="/outdate"
          :title="translateText('outdatedTasks')"
          :Icon="EpAlarmClock"
          :itemsNum="itemsNum.outdate"
        />
      </li>
      <li :class="{ activePath: route.path === '/recycle' }">
        <ListItem
          path="/recycle"
          :title="translateText('recycle')"
          :Icon="GiRecycle"
          :itemsNum="itemsNum.recycle"
        />
      </li>
      <li :class="{ activePath: route.path === '/calendar' }">
        <ListItem
          path="/calendar"
          :title="translateText('calendar')"
          :Icon="BsCalendar2Date"
          :is-hidden-num="true"
          :itemsNum="0"
        />
      </li>
      <li :class="{ activePath: route.path === '/about' }">
        <ListItem
          path="/about"
          :title="translateText('about')"
          :Icon="SiAboutdotme"
          :is-hidden-num="true"
          :itemsNum="0"
        />
      </li>
    </ul>
    <Project :itemsNum="itemsNum.projectsNum" />

    <Mask v-if="isModalShow" @closeModal="closeModal"
      ><Modal @closeModal="closeModal"
    /></Mask>
  </main>
</template>

<style scoped>
.btn {
  cursor: pointer;
  padding: 0.8rem 2rem;
  border-radius: 15px;
}

.search {
  outline: none;
  border: none;
  padding: 0.3rem 0.5rem 0.3rem;
  background-color: transparent;
}

.searchBtn {
  position: relative;
  padding-left: 0.5rem;

  border: 1px solid var(--btn-color);
  border-radius: 5px;
}
</style>
