<script setup lang="ts">
import Mask from '@/Mask.vue'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { BiCheckCircle, BiCircle } from 'vue-icons-plus/bi'
import { BsFillFlagFill } from 'vue-icons-plus/bs'
import { CgCalendarDates } from 'vue-icons-plus/cg'
import Modal from './Modal.vue'
import { useMaskStore } from '@/stores/mask'
import { useReloadStore } from '@/stores/reload'
import type { PremierTypes } from '@/types'

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

function closeModal() {
  isModalShow.value = false
  maskStore.closeMask()
}

const dateText = computed<string>(() => {
  const today = dayjs().format('YYYY年MM月DD日')
  const taskDate = dayjs(date).format('YYYY年MM月DD日')
  return today === taskDate ? '今天' : taskDate.slice(5)
})
const premierText = computed(() => {
  const premierTextObj = {
    first: '优先级1',
    second: '优先级2',
    third: '优先级3',
    forth: '优先级4',
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
      <p class="overflow-hidden whitespace-nowrap text-ellipsis">
        {{ desc }}
      </p>
      <div class="w-full flex items-center tags gap-3">
        <div
          class="flex items-center gap-1"
          :title="dayjs(date).format('YYYY年MM月DD日')"
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
