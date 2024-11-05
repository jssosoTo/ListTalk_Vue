<script setup lang="ts">
import Mask from '@/Mask.vue'
import Modal from './Modal.vue'
import { ref } from 'vue'
import { useMaskStore } from '@/stores/mask'

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
    type: Number,
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

const isModalShow = ref(false)
const maskStore = useMaskStore()

function closeModal() {
  isModalShow.value = false
  maskStore.closeMask()
}
console.log({ id, title, desc, date, premier, associatePjt: { ...type } })
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
</script>

<template>
  <div
    class="py-2 px-1 border rounded-lg cursor-pointer"
    :class="premier"
    @click.stop="openModal"
  >
    <h4 class="overflow-hidden text-ellipsis whitespace-nowrap text-xs">
      {{ title }}
    </h4>
  </div>
  <Mask v-if="isModalShow" @closeModal="closeModal"
    ><Modal @closeModal="closeModal"
  /></Mask>
</template>

<style scoped>
.first {
  background-color: #d1453b;
  color: white;
  border-color: transparent;
}

.second {
  background-color: #eb8909;
  color: white;
  border-color: transparent;
}

.third {
  background-color: #246fe0;
  color: white;
  border-color: transparent;
}

.forth {
  color: var(--text);
}
</style>
