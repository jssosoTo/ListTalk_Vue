<script setup lang="ts">
import { ref } from 'vue'
import Input from './Input.vue'
import { useAlertStore } from '@/stores/alert'
import type { ProjectProp } from '@/types'
const emit = defineEmits(['closeModal'])
const inputInfo = ref<{ title: string; detail: string }>({
  title: '',
  detail: '',
})
const alertStore = useAlertStore()

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
    alertStore.openAlert('项目新增成功')
    emit('closeModal')
  }
}
</script>

<template>
  <div>
    <h1 class="px-4 text-lg">新建项目</h1>
    <div class="hr"></div>
    <form @submit.prevent="handleSubmit" class="px-4 flex flex-col gap-4">
      <Input v-model="inputInfo.title" label="标题" name="title" />
      <Input v-model="inputInfo.detail" label="简介" name="detail" />
      <div class="flex items-center gap-2 justify-end">
        <button class="cancel_btn" @click="emit('closeModal')">取消</button>
        <button type="submit" class="submit_btn">保存</button>
      </div>
    </form>
  </div>
</template>
