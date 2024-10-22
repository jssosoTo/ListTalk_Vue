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

const route = useRoute()
const maskStore = useMaskStore()
</script>

<template>
  <main class="flex-1 mt-3 flex flex-col gap-1">
    <div class="flex justify-center gap-2 btn" @click="maskStore.openMask">
      <MdAddCircle style="color: #dc4c3e" />
      <span>添加任务</span>
    </div>
    <div class="flex items-center searchBtn">
      <BsSearchHeartFill style="width: 0.98rem" />
      <input class="flex-1 search" placeholder="搜索" />
    </div>
    <ul class="flex flex-col gap-2" style="margin-top: 0.5rem">
      <li :class="{ activePath: route.path === '/today' }">
        <ListItem
          path="/today"
          title="今天"
          :Icon="BsCalendar3"
          :itemsNum="8"
        />
      </li>
      <li :class="{ activePath: route.path === '/outdate' }">
        <ListItem
          path="/outdate"
          title="超时任务"
          :Icon="EpAlarmClock"
          :itemsNum="10"
        />
      </li>
      <li :class="{ activePath: route.path === '/recycle' }">
        <ListItem
          path="/recycle"
          title="回收站"
          :Icon="GiRecycle"
          :itemsNum="3"
        />
      </li>
      <li :class="{ activePath: route.path === '/calendar' }">
        <ListItem
          path="/calendar"
          title="日历"
          :Icon="BsCalendar2Date"
          :itemsNum="0"
        />
      </li>
    </ul>

    <Mask><Modal /></Mask>
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
