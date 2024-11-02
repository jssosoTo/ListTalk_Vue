<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import ContentModal from './ContentModal.vue'

defineProps(['title'])
const emit = defineEmits(['onConfirm'])

const isShow = ref<boolean>(false)

function closeModal() {
  isShow.value = false
}

onMounted(() => window.addEventListener('click', closeModal))
onUnmounted(() => window.removeEventListener('click', closeModal))
</script>

<template>
  <ContentModal class="z-10">
    <template #button>
      <div @click.stop="isShow = true">
        <slot></slot>
      </div>
    </template>
    <template #content v-if="isShow">
      <div
        @click.stop
        class="w-max translate-y-0 px-4 py-2 rounded trash_modal"
      >
        <h4 class="mb-2 text-lg">{{ title }}</h4>
        <div class="flex justify-end gap-1">
          <button class="cancel_btn" @click="isShow = false">取消</button>
          <button
            type="submit"
            class="submit_btn"
            @click="
              () => {
                emit('onConfirm')
                isShow = false
              }
            "
          >
            确认
          </button>
        </div>
        <div class="arrow-circle"></div>
      </div>
    </template>
  </ContentModal>
</template>

<style scoped>
.trash_modal {
  position: relative;
  background-color: var(--modal-bg);
}

.arrow-circle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateY(-100%);
  border: 0.6rem solid transparent;
  border-bottom-color: var(--modal-bg);
}
</style>
