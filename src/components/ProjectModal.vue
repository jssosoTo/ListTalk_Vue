<script setup lang="ts">
import { ref } from 'vue'
import Input from './Input.vue'
const emit = defineEmits(['closeModal'])
const inputInfo = ref({
  title: '',
  detail: '',
})

function handleSubmit() {
  if (!inputInfo.value.title) {
    console.log('请输入标题')
  } else {
    const id = Date.now()
    const { title, detail } = inputInfo.value
    const storeProjects = JSON.parse(localStorage.getItem('projects') || '[]')
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
    console.log('添加完成')
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
