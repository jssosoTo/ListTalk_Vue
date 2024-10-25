<script setup lang="ts">
import Mask from '@/Mask.vue'
import { useMaskStore } from '@/stores/mask'
import { ref } from 'vue'
import { AiOutlinePlus } from 'vue-icons-plus/ai'
import { SiTicktick } from 'vue-icons-plus/si'
import Modal from './Modal.vue'
import Divider from './Divider.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  isTaskNumShow: {
    type: Boolean,
  },
})

const maskStore = useMaskStore()
const isModalShow = ref(false)

function openModal() {
  isModalShow.value = true
  maskStore.openMask()
}

function closeModal() {
  isModalShow.value = false
}
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
          <SiTicktick class="w-3" /><span> {{ 8 }}个任务 </span>
        </div>
        <div
          class="inline-flex items-center gap-2 mt-2 addBtn cursor-pointer"
          @click="openModal"
        >
          <button><AiOutlinePlus /></button>
          <span>添加任务</span>
        </div>
      </div>
      <Divider class="my-4" />
      <div class="flex-1">
        <slot></slot>
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
