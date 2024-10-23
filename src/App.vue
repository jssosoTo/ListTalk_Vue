<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { ref } from 'vue'
import HeaderItem from './components/HeaderItem.vue'
import AddListContainer from './components/AddListContainer.vue'

const theme = useThemeStore()
const isNavShow = ref(true)

function toggleNav() {
  isNavShow.value = !isNavShow.value
}
</script>

<template>
  <div :class="[theme.theme]" class="app flex">
    <nav class="flex flex-col" :class="[isNavShow ? 'p-3 w-72' : 'pt-3']">
      <HeaderItem :isNavShow :toggleNav />
      <AddListContainer :style="{ display: isNavShow ? 'flex' : 'none' }" />
    </nav>

    <div class="flex-1">
      <div class="w-1/2 mx-auto">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
:root .dark {
  --shade-border-color: rgba(211, 211, 211, 0.3);
  --main-color: #dc4c3e;
  --main-g-color: #c3392c;
  --second-color: #f5f5f5;
  --second-g-color: #e5e5e5;
  --text: #e2e8f0;
  --bg: rgb(16, 25, 44);
  --shade-bg: rgba(240, 240, 240, 0.1);
  --nav-bg: #1e293b;
  --btn-color: #334155;
  --btn-text: #fff;
  --shade-text: #676767;
  --modal-bg: #334155;
}

:root .light {
  --shade-border-color: rgba(211, 211, 211, 0.4);
  --main-color: #dc4c3e;
  --main-g-color: #c3392c;
  --second-color: #d5d5d5;
  --second-g-color: #c5c5c5;
  --text: #334155;
  --bg: #fff;
  --shade-bg: rgba(16, 25, 44, 0.1);
  --nav-bg: #fcfaf8;
  --btn-color: #0f172a;
  --btn-text: #fff;
  --shade-text: #aaaaaa;
  --modal-bg: #fcfaf8;
}

.btn {
  background-color: var(--btn-color);
  color: var(--btn-text);
}

.hr {
  width: 100%;
  height: 1px;
  background-color: var(--shade-border-color);
  margin: 1rem 0;
}

.cancel_btn {
  background-color: var(--second-color);
  padding: 0.25rem 0.6rem;
  border-radius: 0.2rem;
  color: var(--bg);
}

.cancel_btn:hover {
  background-color: var(--second-g-color);
}

.submit_btn {
  background-color: var(--main-color);
  color: #fff;
  padding: 0.25rem 0.6rem;
  border-radius: 0.2rem;
  transition: all 0.3s;
}

.submit_btn:hover {
  background-color: var(--main-g-color);
}

.app {
  background-color: var(--bg);
  color: var(--text);
  width: 100%;
  min-height: 100vh;
}

nav {
  width: 0;
  background-color: var(--nav-bg);
  transition: all 0.3s;
}
</style>

<style scoped>
button {
  position: relative;
}

button:hover::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  border-radius: 5px;
  background-color: var(--shade-bg);
}
</style>
