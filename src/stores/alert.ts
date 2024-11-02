import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useReloadStore } from './reload'

export const useAlertStore = defineStore('alert', () => {
  const reloadStore = useReloadStore()
  const isAlertShow = ref(false)
  const message = ref('')
  const timeoutId = ref<number | null>(null)
  const isConfirm = ref(false)
  const isHidden = ref(false)
  const confirmId = ref<number | null>(null)

  function closeAlert(confirmType?: number | null) {
    if (confirmType) {
      isConfirm.value = false
    } else {
      isAlertShow.value = false
    }
    confirmId.value = null
    message.value = ''
    timeoutId.value = null
    isHidden.value = false
  }

  function openAlert(text: string, id?: number | null, hidden?: boolean) {
    if (timeoutId?.value) clearTimeout(timeoutId.value)
    isHidden.value = false
    message.value = text
    if (id) {
      isConfirm.value = true
      confirmId.value = id
      isAlertShow.value = false
      if (hidden) isHidden.value = true
    } else {
      isAlertShow.value = true
      isConfirm.value = false
    }
    timeoutId.value = setTimeout(closeAlert.bind(null, id), id ? 5000 : 3000)
  }

  function withdrawOperation() {
    const newItems = JSON.parse(localStorage.getItem('allLists') || '[]')
    newItems.find(item => item.id === confirmId.value).checked = false
    localStorage.setItem('allLists', JSON.stringify(newItems))
    closeAlert(confirmId.value)
    reloadStore.reload()
  }

  return {
    openAlert,
    closeAlert,
    isAlertShow,
    message,
    isConfirm,
    withdrawOperation,
    isHidden,
  }
})
