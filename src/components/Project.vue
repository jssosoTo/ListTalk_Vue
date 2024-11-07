<script setup lang="ts">
import Mask from '@/Mask.vue'
import { useMaskStore } from '@/stores/mask'
import { ref, watch } from 'vue'
import { AiOutlinePlus } from 'vue-icons-plus/ai'
import { useRoute } from 'vue-router'
import ProjectModal from './ProjectModal.vue'
import GlobalModal from './GlobalModal.vue'
import { Fa6Hashtag } from 'vue-icons-plus/fa6'
import ListItem from './ListItem.vue'

defineProps({
  itemsNum: {
    type: Array<number>,
    required: true,
  },
})

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
  mask.closeMask()
}

watch(isModalShow, () => {
  projects.value = JSON.parse(localStorage.getItem('projects') || '[]')
})
</script>

<template>
  <div class="mt-4 flex-1 overflow-hidden flex flex-col mb-4">
    <h2 class="flex items-center justify-between plusContainer mx-3">
      <span># 我的项目</span>
      <button class="cursor-pointer plus hidden" @click="openModal">
        <AiOutlinePlus />
      </button>
    </h2>
    <ul
      class="flex-1 flex overflow-y-auto flex-col px-3"
      style="margin-top: 0.5rem"
    >
      <li
        v-for="{ id, path, title } in projects"
        :key="id"
        :class="{ activePath: route.path.includes(path) }"
      >
        <ListItem
          :path="`/projects/${path}`"
          :title="title"
          :Icon="Fa6Hashtag"
          :itemsNum="itemsNum[id]"
        />
      </li>
    </ul>
  </div>

  <Mask v-if="isModalShow" @closeModal="closeModal">
    <GlobalModal><ProjectModal @closeModal="closeModal" /></GlobalModal>
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
