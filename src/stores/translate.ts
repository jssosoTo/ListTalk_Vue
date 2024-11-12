import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTranslateStore = defineStore('translate', () => {
  const language = ref(localStorage.getItem('language') || 'zh-cn')

  function handleSwitch() {
    const newLanguage = language.value === 'zh-cn' ? 'en' : 'zh-cn'
    localStorage.setItem('language', newLanguage)
    language.value = newLanguage
    window.location.reload()
  }

  return {
    language,
    handleSwitch,
  }
})
