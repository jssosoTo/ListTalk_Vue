<script setup lang="ts">
import Mask from '@/Mask.vue'
import { useMaskStore } from '@/stores/mask'
import { ref } from 'vue'
import { AiOutlinePlus } from 'vue-icons-plus/ai'
import { useRoute } from 'vue-router'
import ProjectModal from './ProjectModal.vue'
import GlobalModal from './GlobalModal.vue'

const route = useRoute()
const mask = useMaskStore()
const projects = ref(JSON.parse(localStorage.getItem('projects') || '[]'))
const isModalShow = ref(false)

function openModal() {
  isModalShow.value = true
  mask.openMask()
}

function closeModal() {
  isModalShow.value = false
}
</script>

<template>
  <div class="mt-4">
    <h2 class="flex items-center justify-between plusContainer">
      <span># 我的项目</span>
      <button class="cursor-pointer plus hidden" @click="openModal">
        <AiOutlinePlus />
      </button>
    </h2>
    <ul class="flex flex-col" style="margin-top: 0.5rem">
      <li :class="{ activePath: route.path === '/today' }"></li>
    </ul>
  </div>

  <Mask v-if="isModalShow" @closeModal="closeModal">
    <GlobalModal><ProjectModal /></GlobalModal>
  </Mask>
</template>

<style scoped>
.plusContainer:hover .plus {
  display: inline-block;
}

.plus {
  padding-right: 0.25rem;
  padding-left: 0.25rem;
  border-radius: 5px;
}

.plus:hover {
  background-color: var(--shade-text);
}

.plus svg {
  width: 0.95rem;
}
</style>
