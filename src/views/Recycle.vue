<script setup lang="ts">
import PopConfirm from '@/components/PopConfirm.vue'
import { FcFullTrash } from 'vue-icons-plus/fc'
import { PiTrashSimple } from 'vue-icons-plus/pi'
import { RiArrowGoBackLine } from 'vue-icons-plus/ri'
</script>
<!-- @click.capture="isTrashModalOpen = false" -->

<template>
  <div class="px-24 pt-8 pb-4 h-full flex flex-col overflow-y-auto">
    <h1 class="text-xl">已确认的任务</h1>
    <div class="title flex items-center justify-between mt-4">
      <h2>系统会在 30 天后删除这些任务</h2>
      <div class="btns">
        <PopConfirm title="确认清空回收站吗" @on-confirm="console.log('save')">
          <button class="flex items-center gap-2 fnBtn">
            <FcFullTrash />
            清空回收站
          </button>
        </PopConfirm>
      </div>
    </div>
    <table class="flex-1 w-full text-left overflow-y-auto relative">
      <thead class="sticky -top-8 header">
        <tr>
          <th>日期</th>
          <th>标题</th>
          <th>完成日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="n in 20">
          <td>2024年11月4日</td>
          <td>是大大啊倒是</td>
          <td>2024年11月1日</td>
          <td class="flex items-center gap-4 options">
            <button>
              <RiArrowGoBackLine />
            </button>
            <button>
              <PiTrashSimple />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.header {
  z-index: 1;
  background-color: var(--bg);
}

.fnBtn {
  padding: 0.4rem 1rem;
  border-radius: 5px;
}

.fnBtn:hover {
  background-color: var(--btn-color);
  color: var(--btn-text);
}

th,
td {
  padding: 0.8rem 0.5rem;
}

td {
  border-top: 1px solid var(--text);
}

table {
  border: 1px solid var(--text);
  border-radius: 10px;
  border-collapse: separate;
}

.options button {
  position: relative;
}

.options button:hover::after {
  content: '';
  position: absolute;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--shade-bg);
}
</style>
