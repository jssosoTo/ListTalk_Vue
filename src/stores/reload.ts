import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReloadStore = defineStore('reload', () => {
  const reload = ref(() => {})
  const permanentReload = ref(() => {})

  function changeReload(fn) {
    reload.value = fn
  }

  function changePermanentReload(fn) {
    permanentReload.value = fn
  }

  return {
    reload,
    permanentReload,
    changeReload,
    changePermanentReload,
  }
})
