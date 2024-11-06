<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { ref } from 'vue'
import HeaderItem from './components/HeaderItem.vue'
import AddListContainer from './components/AddListContainer.vue'
import Alert from './components/Alert.vue'
import Confirm from './components/Confirm.vue'

const theme = useThemeStore()
const isNavShow = ref(true)

function toggleNav() {
  isNavShow.value = !isNavShow.value
}
</script>

<template>
  <div :class="[theme.theme]" class="app flex">
    <aside class="flex flex-col" :class="[isNavShow ? 'w-72' : 'pt-3']">
      <HeaderItem :isNavShow :toggleNav />
      <AddListContainer :style="{ display: isNavShow ? 'flex' : 'none' }" />
    </aside>

    <div class="flex-1">
      <RouterView />
    </div>

    <Alert />
    <Confirm />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  overflow-x: hidden !important;
}

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

/* 自定义整个滚动条 */
::-webkit-scrollbar {
  width: 0.5em; /* 设置滚动条的宽度 */
}

/* 自定义滚动条轨道 */
::-webkit-scrollbar-track {
  background: transparent; /* 设置轨道的背景颜色 */
}

/* 自定义滚动条的滑块（thumb） */
::-webkit-scrollbar-thumb {
  background-color: transparent; /* 设置滑块的背景颜色 */
  border-radius: 1000px;
}

*:hover::-webkit-scrollbar-thumb {
  background-color: #555; /* 设置滑块的背景颜色 */
}

/* 当滑块悬停或活动时自定义 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 设置滑块在悬停状态下的背景颜色 */
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
  height: 100vh;
}

aside {
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
