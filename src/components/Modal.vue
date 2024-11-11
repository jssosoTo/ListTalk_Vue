<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, onMounted, ref, useTemplateRef } from 'vue'
import { BiSolidDownArrow } from 'vue-icons-plus/bi'
import ContentModal from './ContentModal.vue'
import ButtonModal from './ButtonModal.vue'
import SelectItem from './SelectItem.vue'
import { useReloadStore } from '@/stores/reload'
import { useMaskStore } from '@/stores/mask'
import { useAlertStore } from '@/stores/alert'
import type { ListProp, ModalProp, ProjectProp } from '@/types'
import { BsArrowsMove } from 'vue-icons-plus/bs'

const emit = defineEmits<{ (e: 'closeModal'): void }>()
const initialValues = useMaskStore().initialValues
const alertStore = useAlertStore()

const projects = ref<ProjectProp[]>(
  JSON.parse(localStorage.getItem('projects') || '[]'),
)
const textarea = useTemplateRef<HTMLTextAreaElement>('text')
const modalInfo = ref<ModalProp>({
  title: '',
  desc: '',
  date: dayjs().format('YYYY-MM-DD'),
  premier: 'forth',
  associatePjt: {
    title: '',
    value: '',
  },
  btnModalText: '',
  ...initialValues,
})
const isPjtBtnModalOpen = ref<boolean>(false)
const isMove = ref<boolean>(false)
const initialOffset = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const modalRef = useTemplateRef<HTMLDivElement>('modal')
const reloadStore = useReloadStore()
const reload = reloadStore.reload
const permanentReload = reloadStore.permanentReload

function autoSize(e: Event) {
  const textarea: HTMLTextAreaElement = e.target as HTMLTextAreaElement
  textarea.style.height = textarea.scrollHeight + 'px'
}

function getMaxPosition(position: number, isY?: boolean) {
  const modal = modalRef.value!.getBoundingClientRect()
  if (isY) {
    return Math.max(0, Math.min(position, window.innerHeight - modal.height))
  }
  return Math.max(0, Math.min(position, window.innerWidth - modal.width))
}

function move(e: MouseEvent) {
  if (!isMove.value) return
  const modalPosition: { left: number; top: number } = (
    e.target as HTMLHeadElement
  ).getBoundingClientRect()
  ;(modalRef.value as HTMLDivElement).style.left =
    getMaxPosition(modalPosition.left + (e.offsetX - initialOffset.value.x)) +
    'px'
  ;(modalRef.value as HTMLDivElement).style.top =
    getMaxPosition(
      modalPosition.top + (e.offsetY - initialOffset.value.y),
      true,
    ) + 'px'
}

function closeBtnModal() {
  modalInfo.value.btnModalText = ''
  isPjtBtnModalOpen.value = false
}

function selectPjt(value: number, title: string) {
  modalInfo.value.associatePjt.value = value
  modalInfo.value.associatePjt.title = title
  closeBtnModal()
}

function submit() {
  if (!modalInfo.value.title) return false
  const { btnModalText: _, associatePjt: type, ...params } = modalInfo.value
  let storeList: ListProp[] = JSON.parse(
    localStorage.getItem('allLists') || '[]',
  )
  if (!modalInfo.value.id) {
    storeList.push({
      id: Date.now(),
      type,
      ...params,
    })
  } else {
    storeList = storeList.map(item => {
      if (item.id === modalInfo.value.id) {
        return {
          id: item.id,
          type,
          ...params,
        }
      }
      return item
    })
  }
  localStorage.setItem('allLists', JSON.stringify(storeList))
  alertStore.openAlert(modalInfo.value.id ? '任务编辑成功' : '任务新增成功')
  emit('closeModal')
  permanentReload()
  reload()
}

const filterProjects = computed<ProjectProp[]>(() => {
  if (!modalInfo.value.btnModalText) return projects.value
  return projects.value.filter(({ title }: { title: string }) =>
    title.includes(modalInfo.value.btnModalText),
  )
})

onMounted(() => {
  autoSize({ target: textarea.value } as Event)
})
</script>

<template>
  <div class="modal-container" @click.stop ref="modal">
    <header
      class="header"
      @mousedown.left.stop="
        (e: MouseEvent) => {
          isMove = true
          initialOffset = { x: e.offsetX, y: e.offsetY }
        }
      "
      @mousemove.stop="move"
      @mouseleave.stop="
        () => {
          isMove = false
          initialOffset = { x: 0, y: 0 }
        }
      "
      @mouseup.stop="
        () => {
          isMove = false
          initialOffset = { x: 0, y: 0 }
        }
      "
    >
      <BsArrowsMove />
    </header>
    <form @click.stop="closeBtnModal" @submit.prevent="submit" class="modal">
      <main>
        <div class="headerTitle">
          <input v-model="modalInfo.title" placeholder="请输入标题" />
        </div>
        <div class="intro">
          <textarea
            v-model="modalInfo.desc"
            @input="autoSize"
            style="max-height: 200px"
            ref="text"
            rows="1"
            placeholder="描述"
          ></textarea>
        </div>
        <div class="flex items-stretch gap-2 mt-2">
          <input v-model="modalInfo.date" type="date" />
          <select v-model="modalInfo.premier">
            <option value="first">优先级1</option>
            <option value="second">优先级2</option>
            <option value="third">优先级3</option>
            <option value="forth">优先级4</option>
          </select>
        </div>
      </main>
      <div class="hr"></div>
      <footer class="flex items-center justify-between px-4">
        <ContentModal>
          <template v-slot:button>
            <div
              class="btn flex items-center gap-2"
              @click.stop="isPjtBtnModalOpen = true"
            >
              <span>{{ modalInfo.associatePjt.title || '选择关联项目' }}</span>
              <BiSolidDownArrow style="width: 0.65rem" />
            </div>
          </template>
          <template v-slot:content v-if="isPjtBtnModalOpen">
            <ButtonModal @click.stop>
              <div class="p-2 w-60">
                <input
                  type="text"
                  placeholder="请输入项目名称"
                  v-model="modalInfo.btnModalText"
                  style="outline: none; border-color: var(--shade-border-color)"
                  class="rounded w-full p-1 text-sm bg-transparent border border-solid"
                />
              </div>
              <hr />
              <div>
                <h2 class="pl-2">我的项目</h2>
                <div class="h-48 overflow-y-auto">
                  <SelectItem
                    v-for="{ id, title } in filterProjects"
                    :key="id"
                    :pjtName="modalInfo.associatePjt.value"
                    @selectPjt="selectPjt"
                    :id
                    :title
                  />
                </div>
              </div>
            </ButtonModal>
          </template>
        </ContentModal>

        <div class="flex items-center gap-4">
          <button class="cancel_btn" @click="emit('closeModal')">取消</button>
          <button type="submit" class="submit_btn">保存</button>
        </div>
      </footer>
    </form>
  </div>
</template>

<style scoped>
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin {
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
}

.modal-container {
  position: absolute;
  top: 15vh;
  left: 38%;
  border-radius: 15px !important;
  box-shadow: 5px 10px 25px 5px rgba(0, 0, 0, 0.5);
}

.header {
  padding: 0.4rem;
  border-top-right-radius: 15px !important;
  border-top-left-radius: 15px !important;
  background-color: var(--nav-bg);
  border-bottom: 1px solid var(--shade-text);
  cursor: move;
}

.header:hover {
  background-color: var(--shade-text);
}

.modal {
  display: inline-block;
  background-color: var(--nav-bg);
  padding: 1rem 0;
  min-width: 30vw;
  border-bottom-left-radius: 15px !important;
  border-bottom-right-radius: 15px !important;
  /* border-width: 3px;
  border-style: solid;
  border-image: conic-gradient(from var(--angle), red, blue, red) 1;
  animation: 1s spin linear infinite; */
}

main {
  padding: 0 1rem;
}

.headerTitle input {
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid var(--shade-border-color);
  transition: all 0.2s;
  font-size: 1.25rem;

  margin-bottom: 1rem;
}

.headerTitle input:focus {
  caret-color: var(--main-color);
  border-color: var(--main-color);
}

.intro textarea {
  resize: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  height: auto;
}

input[type='date'] {
  cursor: pointer;
  border-radius: 5px;
  padding: 0.4rem 0.6rem;
  background-color: var(--shade-bg);
}

select {
  cursor: pointer;
  border-radius: 5px;
  padding: 0 0.6rem;
  background-color: var(--shade-bg);
}

select option {
  color: black;
}

.btn {
  cursor: pointer;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  transition: all 0.6s;
}

.btn:hover {
  background-color: var(--shade-bg);
  color: var(--text);
}
</style>
