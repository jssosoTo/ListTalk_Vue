<script setup lang="ts">
import CalendarItem from '@/components/CalendarItem.vue'
import Modal from '@/components/Modal.vue'
import Mask from '@/Mask.vue'
import { useMaskStore } from '@/stores/mask'
import { useReloadStore } from '@/stores/reload'
import { useTranslateStore } from '@/stores/translate'
import type { ListProp, TranslateTextType } from '@/types'
import dayjs, { Dayjs } from 'dayjs'
import { computed, inject, ref } from 'vue'
import { EpArrowLeftBold, EpArrowRightBold } from 'vue-icons-plus/ep'

const translateText = inject<TranslateTextType>(
  'translateText',
  (title: string) => title,
)
const days: string[] = [
  translateText('sunday'),
  translateText('monday'),
  translateText('tuesday'),
  translateText('wednesday'),
  translateText('thursday'),
  translateText('friday'),
  translateText('saturday'),
]
const today = ref<Dayjs>(dayjs())
const thisDay = ref<string>(dayjs().format('YYYY-MM-DD'))
const isModalShow = ref<boolean>(false)
const reloadStore = useReloadStore()
const maskStore = useMaskStore()
const allList = ref<ListProp[]>(
  JSON.parse(localStorage.getItem('allLists') || '[]'),
)
const translateStore = useTranslateStore()

function openModal(date: string) {
  isModalShow.value = true
  maskStore.openMask({ date })
}

function closeModal() {
  isModalShow.value = false
  maskStore.closeMask()
}

function reload() {
  allList.value = JSON.parse(localStorage.getItem('allLists') || '[]')
}
reloadStore.changeReload(reload)

const yearMonth = `YYYY${translateText('year')}MM${translateStore.language === 'zhCN' ? translateText('month') : ''}`

async function addHandler() {
  today.value = today.value.add(1, 'M')
}

function minusHandler() {
  today.value = today.value.subtract(1, 'M')
}

const dateTitle = computed<string>(() => today.value.format(yearMonth))
const dateArrs = computed(() => {
  const lastDates = []
  const thisDates = []
  const thisMonthDays = today.value.endOf('M').date()
  const lastMonthDate = today.value.startOf('M')
  const lastMonthDays = lastMonthDate.subtract(1, 'day')
  const lastShowDays = lastMonthDate.subtract(35 - thisMonthDays, 'days')
  const times = lastMonthDays.date() - lastShowDays.date()
  for (let i = 0; i <= times; i++) {
    const date = lastShowDays.add(i, 'days')
    lastDates.push({
      date: date.format('YYYY-MM-DD'),
      text: date.format('DD'),
    })
  }
  for (let i = lastMonthDate.date(); i <= thisMonthDays; i++) {
    const date = lastMonthDate.add(i - 1, 'days')
    thisDates.push({
      date: date.format('YYYY-MM-DD'),
      text:
        lastMonthDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
          ? date.format(yearMonth)
          : date.format('DD'),
    })
  }
  return [...lastDates, ...thisDates].map(
    ({ date, text }: { date: string; text: string }) => {
      const arr = allList.value.filter(
        ({ date: itemDate }: { date: string }) => date === itemDate,
      )
      return { date, arr, text }
    },
  )
})
</script>

<template>
  <div class="h-full pt-4 px-4 flex flex-col">
    <div class="flex items-center justify-between text-lg">
      <div class="flex items-center">
        <div class="switch_btn flex items-center gap-4">
          <button class="arrow" @click="minusHandler">
            <EpArrowLeftBold />
          </button>
          <button class="today_btn" @click="today = dayjs()">
            {{ translateText('thisMonth') }}
          </button>
          <button class="arrow" @click="addHandler">
            <EpArrowRightBold />
          </button>
        </div>
      </div>
      <h2 class="text-xl">{{ dateTitle }}</h2>
    </div>

    <main
      class="flex-1 grid grid-cols-7 grid-rows-5 py-3 rounded-lg overflow-hidden"
    >
      <div
        v-for="({ date, arr, text }, i) in dateArrs"
        :key="date"
        class="flex flex-col border border-solid"
        @click.stop="openModal(date)"
      >
        <h6 class="text-center text-xs mt-1" v-if="i < 7">
          {{ days[dayjs(date).day()] }}
        </h6>
        <h4 class="text-center text-sm" :class="{ 'mt-2': i >= 7 }">
          <span :class="{ today: thisDay === date }" :data-content="text">{{
            text
          }}</span>
        </h4>
        <TransitionGroup
          tag="div"
          class="calendarItem flex-1 pt-1 flex flex-col gap-1 overflow-y-auto"
          name="calendarItem"
          v-if="arr.length"
        >
          <CalendarItem
            v-for="list in arr"
            :key="list.id"
            :id="list.id!"
            :title="list.title!"
            :desc="list.desc!"
            :date="list.date"
            :premier="list.premier"
            :type="list.type!"
          />
        </TransitionGroup>
      </div>
    </main>

    <Mask v-if="isModalShow" @closeModal="closeModal">
      <Modal v-if="isModalShow" @closeModal="closeModal"></Modal>
    </Mask>
  </div>
</template>

<style scoped>
.calendarItem::-webkit-scrollbar {
  width: 0; /* 设置滚动条的宽度 */
}

.switch_btn svg {
  width: 1.2rem;
}

.switch_btn .arrow {
  cursor: pointer;
  position: relative;
}

.switch_btn .arrow:hover::after {
  content: '';
  position: absolute;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--shade-bg);
}

.today_btn {
  padding: 0.25rem 1rem;
  border: 1px solid var(--text);
  border-radius: 1000px;
}

.calendarItem-move,
.calendarItem-enter-active,
.calendarItem-leave-active {
  transition: all 0.3s;
}

.calendarItem-leave-to,
.calendarItem-enter-from {
  opacity: 0;
}

.calendarItem-leave-active {
  position: absolute;
}

.today {
  position: relative;
  z-index: 2;
}

.today::before {
  content: attr(data-content);
  position: absolute;
  top: 50%;
  left: 50%;
  height: 140%;
  aspect-ratio: 1;
  line-height: 1.6;
  border-radius: 50%;
  background-color: var(--main-color);
  transform: translate(-50%, -50%);
}
</style>
