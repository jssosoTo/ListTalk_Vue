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
import { computed, ref, toValue } from 'vue'
import { SiAboutdotme } from 'vue-icons-plus/si'
import dayjs from 'dayjs'
import { useReloadStore } from '@/stores/reload'

const route = useRoute()
const thisDate = ref(dayjs().format('YYYY-MM-DD'))
const projects = ref(JSON.parse(localStorage.getItem('projects') || '[]'))
const lists = ref(JSON.parse(localStorage.getItem('allLists') || '[]'))
const maskStore = useMaskStore()
const reloadStore = useReloadStore()
const isModalShow = ref(false)

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

const itemsNum = computed(() => {
  const list = toValue(lists)
  const project = toValue(projects)
  const unChecked = list.filter(item => !item.checked)
  const recycle = list.filter(item => item.checked).length
  const today = unChecked.length
  const outdate = unChecked.filter(item => item.date < thisDate.value).length
  const projectsNum = Object.fromEntries(
    project.map(item => [
      item.id,
      unChecked.reduce((acc, cur) => {
        if (cur.type.value === item.id) {
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
      <span>添加任务</span>
    </div>
    <div v-if="false" class="flex items-center searchBtn mx-3">
      <BsSearchHeartFill style="width: 0.98rem" />
      <input class="flex-1 search" placeholder="搜索" />
    </div>
    <ul class="flex flex-col gap-2 mx-3" style="margin-top: 0.5rem">
      <li :class="{ activePath: route.path === '/search' }">
        <ListItem
          path="/search"
          title="搜索"
          :Icon="BsSearchHeartFill"
          :is-hidden-num="true"
          :itemsNum="0"
        />
      </li>
      <li :class="{ activePath: route.path === '/today' }">
        <ListItem
          path="/today"
          title="今天"
          :Icon="BsCalendar3"
          :itemsNum="itemsNum.today"
        />
      </li>
      <li :class="{ activePath: route.path === '/outdate' }">
        <ListItem
          path="/outdate"
          title="超时任务"
          :Icon="EpAlarmClock"
          :itemsNum="itemsNum.outdate"
        />
      </li>
      <li :class="{ activePath: route.path === '/recycle' }">
        <ListItem
          path="/recycle"
          title="回收站"
          :Icon="GiRecycle"
          :itemsNum="itemsNum.recycle"
        />
      </li>
      <li :class="{ activePath: route.path === '/calendar' }">
        <ListItem
          path="/calendar"
          title="日历"
          :Icon="BsCalendar2Date"
          :is-hidden-num="true"
          :itemsNum="0"
        />
      </li>
      <li :class="{ activePath: route.path === '/about' }">
        <ListItem
          path="/about"
          title="关于 - 应用以及作者"
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
