import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMaskStore = defineStore('mask', () => {
  const isMaskShow = ref(false)
  const initialValues = ref(null)
  const particularStyles = ref({})

  function setStyles(styles: StyleSheet) {
    particularStyles.value = styles
  }

  function toggleMaskShow() {
    isMaskShow.value = !isMaskShow.value
  }

  function openMask(injectInitialValues?: object) {
    isMaskShow.value = true
    initialValues.value = injectInitialValues || null
  }

  function closeMask() {
    isMaskShow.value = false
    particularStyles.value = {}
    initialValues.value = null
  }

  return {
    isMaskShow,
    initialValues,
    toggleMaskShow,
    openMask,
    closeMask,
    setStyles,
    particularStyles,
  }
})
