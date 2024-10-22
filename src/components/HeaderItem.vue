<script setup lang="ts">
import Logo from './../assets/Logo.png'
import { LuPanelLeft } from 'vue-icons-plus/lu'
import { CiLight } from 'vue-icons-plus/ci'
import { MdDarkMode } from 'vue-icons-plus/md'
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

const { isNavShow, toggleNav } = defineProps({
  isNavShow: {
    type: Boolean,
    required: true,
  },
  toggleNav: {
    type: Function,
    required: true,
  },
})

const theme = useThemeStore()
</script>

<template>
  <header class="flex items-center justify-between">
    <section class="flex gap-3 items-center" :class="{ hidden: !isNavShow }">
      <img class="w-8 h-8 rounded" :src="Logo" alt="logo" />
      <h1><RouterLink to="/">ListTalk</RouterLink></h1>
    </section>
    <section class="flex items-center gap-4">
      <button @click="theme.toggleTheme" :class="{ hidden: !isNavShow }">
        <template v-if="theme.theme === 'dark'">
          <CiLight />
        </template>
        <template v-else>
          <MdDarkMode />
        </template>
      </button>
      <button
        @click="toggleNav"
        style="z-index: 1"
        :class="{ 'ml-3': !isNavShow }"
      >
        <LuPanelLeft />
      </button>
    </section>
  </header>
</template>
