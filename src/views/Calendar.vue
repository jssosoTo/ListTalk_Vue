<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { EpArrowLeftBold, EpArrowRightBold } from 'vue-icons-plus/ep'

const today = ref(dayjs())

async function addHandler() {
  today.value = today.value.add(1, 'M')
}

function minusHandler() {
  today.value = today.value.subtract(1, 'M')
}

const dateTitle = computed(() => today.value.format('YYYY年MM月'))
const dateArrs = computed(() => {
  const thisMonthDays = today.value.endOf('M').date()
  const lastMonthDate = today.value.startOf('M')
  const lastMonthDays = lastMonthDate.subtract(1, 'day').date()
  const lastShowDays = lastMonthDate.subtract(35 - thisMonthDays, 'days').date()
  console.log(lastMonthDays, lastShowDays)
  return []
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
            本月{{ dateArrs }}
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
      <div v-for="n in 35" class="flex flex-col border border-solid">
        <h6 class="text-center text-xs mt-1">周日</h6>
        <h4 class="text-center text-sm">27</h4>
        <div class="flex-1"></div>
      </div>
    </main>
  </div>
</template>

<style scoped>
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
</style>
