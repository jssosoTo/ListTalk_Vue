import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReloadStore = defineStore('reload', () => {
  const reload = ref(() => {})

  function changeReload(fn) {
    reload.value = fn
  }

  return {
    reload,
    changeReload,
  }
})
