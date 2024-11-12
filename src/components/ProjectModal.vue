<script setup lang="ts">
import { inject, ref } from 'vue'
import Input from './Input.vue'
import { useAlertStore } from '@/stores/alert'
import type { ProjectProp, TranslateTextType } from '@/types'
const emit = defineEmits(['closeModal'])
const inputInfo = ref<{ title: string; detail: string }>({
  title: '',
  detail: '',
})
const alertStore = useAlertStore()
const translateText = inject<TranslateTextType>(
  'translateText',
  (title: string) => title,
)

function handleSubmit() {
  if (!inputInfo.value.title) {
    console.log('请输入标题')
  } else {
    const id: number = Date.now()
    const { title, detail } = inputInfo.value
    const storeProjects: ProjectProp[] = JSON.parse(
      localStorage.getItem('projects') || '[]',
    )
    localStorage.setItem(
      'projects',
      JSON.stringify([
        ...storeProjects,
        {
          id,
          path: id.toString(),
          title,
          detail,
        },
      ]),
    )
    alertStore.openAlert(translateText('addSuccess'))
    emit('closeModal')
  }
}
</script>

<template>
  <div>
    <h1 class="px-4 text-lg">{{ translateText('createProject') }}</h1>
    <div class="hr"></div>
    <form @submit.prevent="handleSubmit" class="px-4 flex flex-col gap-4">
      <Input
        v-model="inputInfo.title"
        :label="translateText('title')"
        name="title"
      />
      <Input
        v-model="inputInfo.detail"
        :label="translateText('desc')"
        name="detail"
      />
      <div class="flex items-center gap-2 justify-end">
        <button class="cancel_btn" @click="emit('closeModal')">
          {{ translateText('cancel') }}
        </button>
        <button type="submit" class="submit_btn">
          {{ translateText('save') }}
        </button>
      </div>
    </form>
  </div>
</template>
