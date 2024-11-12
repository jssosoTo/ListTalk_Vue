<script setup lang="ts">
import Mask from '@/Mask.vue'
import dayjs from 'dayjs'
import { computed, inject, ref } from 'vue'
import { BiCheckCircle, BiCircle } from 'vue-icons-plus/bi'
import { BsFillFlagFill } from 'vue-icons-plus/bs'
import { CgCalendarDates } from 'vue-icons-plus/cg'
import Modal from './Modal.vue'
import { useMaskStore } from '@/stores/mask'
import { useReloadStore } from '@/stores/reload'
import type { PremierTypes, TranslateTextType } from '@/types'

const { id, title, desc, date, premier, type } = defineProps({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  premier: {
    required: true,
  },
  type: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['checkedItem'])

const maskStore = useMaskStore()
const reloadStore = useReloadStore()
const isModalShow = ref<boolean>(false)

function openModal() {
  isModalShow.value = true
  maskStore.openMask({
    id,
    title,
    desc,
    date,
    premier,
    associatePjt: { ...type },
  })
}
const translateText = inject<TranslateTextType>(
  'translateText',
  (title: string) => title,
)

function closeModal() {
  isModalShow.value = false
  maskStore.closeMask()
}

const dateText = computed<string>(() => {
  const today = dayjs().format(
    `YYYY${translateText('year')}MM${translateText('month')}DD${translateText('day')}`,
  )
  const taskDate = dayjs(date).format(
    `YYYY${translateText('year')}MM${translateText('month')}DD${translateText('day')}`,
  )
  return today === taskDate ? translateText('today') : taskDate.slice(5)
})
const premierText = computed(() => {
  const premierTextObj = {
    first: `${translateText('premier')}1`,
    second: `${translateText('premier')}2`,
    third: `${translateText('premier')}3`,
    forth: `${translateText('premier')}4`,
  }

  return premierTextObj[premier as PremierTypes]
})
</script>

<template>
  <div class="py-2" @click.stop>
    <div class="flex items-center gap-2">
      <button
        class="checkBtn"
        @click.stop="
          () => {
            emit('checkedItem', id)
            reloadStore.permanentReload()
          }
        "
      >
        <BiCheckCircle class="w-0 h-0 check" />
        <BiCircle class="circle" />
      </button>
      <h4
        @click="openModal"
        class="flex-1 overflow-hidden whitespace-nowrap text-ellipsis text-lg cursor-pointer"
      >
        {{ title }}
      </h4>
    </div>
    <div @click="openModal" class="content cursor-pointer">
      <p class="textOVerThree">
        {{ desc }}
      </p>
      <div class="w-full flex items-center tags gap-3">
        <div
          class="flex items-center gap-1"
          :title="
            dayjs(date).format(
              `YYYY${translateText('year')}MM${translateText('month')}DD${translateText('day')}`,
            )
          "
        >
          <CgCalendarDates /><span>
            {{ dateText }}
          </span>
        </div>
        <div class="flex items-center gap-1">
          <BsFillFlagFill :class="premier" /><span>{{ premierText }}</span>
        </div>
      </div>
    </div>

    <Mask v-if="isModalShow" @closeModal="closeModal"
      ><Modal @closeModal="closeModal"
    /></Mask>
  </div>
</template>

<style>
.circle,
.check {
  color: var(--shade-border-color);
}

.check:hover {
  color: var(--main-color);
}

.circle {
  width: 1.4rem;
  height: 1.4rem;
}

.checkBtn:hover .check {
  width: 1.4rem;
  height: 1.4rem;
}

.checkBtn:hover .circle {
  width: 0;
  height: 0;
}

.content {
  padding-left: 1.9rem;
}

.content p {
  color: var(--shade-text);
}

.tags {
  font-size: 0.8rem;
}

.tags svg {
  width: 0.95rem;
}

.first {
  color: #d1453b;
}

.second {
  color: #eb8909;
}

.third {
  color: #246fe0;
}

.forth {
  color: #f3f3f3;
}
</style>
