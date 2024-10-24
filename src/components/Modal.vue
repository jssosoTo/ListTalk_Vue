<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import { BiSolidDownArrow } from 'vue-icons-plus/bi'
import ContentModal from './ContentModal.vue'
import ButtonModal from './ButtonModal.vue'
import SelectItem from './SelectItem.vue'

const emit = defineEmits(['closeModal'])

const projects = ref(JSON.parse(localStorage.getItem('projects') || '[]'))
const modalInfo = ref({
  title: '',
  desc: '',
  endDate: dayjs().format('YYYY-MM-DD'),
  premier: 'p4',
  associatePjt: {
    title: '',
    value: '',
  },
  btnModalText: '',
})
const isPjtBtnModalOpen = ref(false)

function autoSize(e: Event) {
  const textarea: HTMLTextAreaElement = e.target as HTMLTextAreaElement
  textarea.style.height = textarea.scrollHeight + 'px'
}

function closeBtnModal() {
  modalInfo.value.btnModalText = ''
  isPjtBtnModalOpen.value = false
}

function selectPjt(value: string, title: string) {
  modalInfo.value.associatePjt.value = value
  modalInfo.value.associatePjt.title = title
  closeBtnModal()
}

function submit() {
  console.log(modalInfo.value, 'submit')
}
</script>

<template>
  <form @click.stop="closeBtnModal" @submit.prevent="submit" class="modal">
    <main>
      <div class="headerTitle">
        <input v-model="modalInfo.title" placeholder="请输入标题" />
      </div>
      <div class="intro">
        <textarea
          v-model="modalInfo.desc"
          @input="autoSize"
          rows="1"
          placeholder="描述"
        ></textarea>
      </div>
      <div class="flex items-stretch gap-2 mt-2">
        <input v-model="modalInfo.endDate" type="date" />
        <select v-model="modalInfo.premier">
          <option value="p1">优先级1</option>
          <option value="p2">优先级2</option>
          <option value="p3">优先级3</option>
          <option value="p4">优先级4</option>
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
                  v-for="{ id, title } in projects"
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

.modal {
  display: inline-block;
  background-color: var(--nav-bg);
  padding: 1rem 0;
  margin-top: 15vh;
  min-width: 30vw;
  box-shadow: 5px 10px 25px 5px rgba(0, 0, 0, 0.5);

  border-radius: 15px !important;
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
}

.btn:hover {
  background-color: var(--shade-bg);
  color: var(--text);
}
</style>
