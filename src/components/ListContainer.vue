<script setup lang="ts">
import Mask from '@/Mask.vue'
import { useMaskStore } from '@/stores/mask'
import { ref, watch } from 'vue'
import { AiOutlinePlus } from 'vue-icons-plus/ai'
import { SiTicktick } from 'vue-icons-plus/si'
import Modal from './Modal.vue'
import Divider from './Divider.vue'
import Dream from '@/assets/Dream.png'

defineProps({
  title: {
    type: String,
    required: true,
  },
  isTaskNumShow: {
    type: Boolean,
  },
  taskNum: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['reload'])

const maskStore = useMaskStore()
const isModalShow = ref(false)

function openModal() {
  isModalShow.value = true
  maskStore.openMask()
}

function closeModal() {
  isModalShow.value = false
  maskStore.closeMask()
}

watch(isModalShow, () => {
  emit('reload')
})
</script>

<template>
  <div class="h-full flex flex-col overflow-y-auto">
    <header class="px-2 py-4"></header>
    <main style="padding: 0 25%" class="flex-1 w-full mx-auto flex flex-col">
      <div class="sticky top-0 header">
        <h1 class="title">{{ title }}</h1>
        <div
          v-if="isTaskNumShow"
          class="flex items-center gap-2 pl-1 shade-text"
        >
          <SiTicktick class="w-3" /><span> {{ taskNum }}个任务 </span>
        </div>
        <div
          class="inline-flex items-center gap-2 mt-2 addBtn cursor-pointer"
          @click="openModal"
        >
          <button><AiOutlinePlus /></button>
          <span>添加任务</span>
        </div>
      </div>
      <Divider class="mt-4" />
      <div class="flex-1 lists">
        <slot>
          <div class="mt-8">
            <div class="flex justify-center">
              <img :src="Dream" width="294" height="267" />
            </div>
            <div>
              <h2 class="text-center text-xl font-extrabold">
                To do or not to do
              </h2>
              <h4 class="text-center text-gray-400">添加任务来开始你的项目</h4>
            </div>
          </div>
        </slot>
      </div>
    </main>

    <Mask v-if="isModalShow" @closeModal="closeModal"
      ><Modal @closeModal="closeModal"
    /></Mask>
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

.shade-text {
  color: var(--shade-text);
}

.addBtn {
  font-size: 1rem;
}

.addBtn:hover {
  color: var(--main-color);
}

.addBtn:hover button svg {
  color: white;
}

.addBtn:hover button {
  position: relative;
  z-index: 1;
  color: var(--text);
}

.addBtn:hover button::after {
  content: '';
  z-index: -1;
  position: absolute;
  width: 120%;
  height: 120%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--main-color);
  border-radius: 50%;
}

.addBtn button {
  color: var(--main-color);
  text-align: center;
  line-height: 1.1rem;
}

.addBtn button svg {
  width: 1.1rem;
  height: 1.1rem;
}
</style>

<style>
.lists > div:not(:last-child) {
  border-bottom: 1px solid var(--shade-border-color);
}
</style>
