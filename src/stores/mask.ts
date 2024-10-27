import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMaskStore = defineStore('mask', () => {
  const isMaskShow = ref(false)
  const initialValues = ref(null)

  function toggleMaskShow() {
    isMaskShow.value = !isMaskShow.value
  }

  function openMask(injectInitialValues?: object) {
    isMaskShow.value = true
    console.log(injectInitialValues)
    initialValues.value = injectInitialValues || null
  }

  function closeMask() {
    isMaskShow.value = false
    initialValues.value = null
  }

  return {
    isMaskShow,
    initialValues,
    toggleMaskShow,
    openMask,
    closeMask,
  }
})
