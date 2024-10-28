import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAlertStore = defineStore('alert', () => {
  const isAlertShow = ref(false)
  const message = ref('')
  const timeoutId = ref<number | null>(null)
  const isConfirm = ref(false)

  function closeAlert(confirmType?: boolean) {
    if (confirmType) {
      isConfirm.value = false
    } else {
      isAlertShow.value = false
    }
    message.value = ''
    timeoutId.value = null
  }

  function openAlert(text: string, confirmType?: boolean) {
    if (timeoutId?.value) clearTimeout(timeoutId.value)
    message.value = text
    if (confirmType) {
      isConfirm.value = true
      isAlertShow.value = false
    } else {
      isAlertShow.value = true
      isConfirm.value = false
    }
    timeoutId.value = setTimeout(
      closeAlert.bind(null, confirmType),
      confirmType ? 5000 : 3000,
    )
  }

  return {
    openAlert,
    closeAlert,
    isAlertShow,
    message,
    isConfirm,
  }
})
