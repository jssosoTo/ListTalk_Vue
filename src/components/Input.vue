<script setup lang="ts">
import { ref } from 'vue'

const { label, name } = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

const inputRef = ref()
const model = defineModel()

function clickInput() {
  inputRef.value.focus()
}
</script>

<template>
  <div class="relative inputContainer" @click="clickInput">
    <input
      v-model="model"
      ref="inputRef"
      class="p-2 input"
      type="text"
      :name
      :id="name"
    />
    <span
      @click="clickInput"
      class="label absolute left-2 top-1/2 -translate-y-1/2"
      :class="{ top: inputRef?.value }"
      >{{ label }}</span
    >
  </div>
</template>

<style scoped>
.input {
  outline: none;
  background-color: transparent;
  border: 1px solid var(--shade-border-color);
  width: 100%;
  border-radius: 5px;
}

.input:focus {
  border-color: var(--main-color);
}

.input:focus + .label,
.top {
  padding: 0 0.2rem;
  top: 0;
  font-size: 0.9rem;
  color: var(--main-color);
}

.label {
  background-color: var(--nav-bg);
  transition: all 0.15s;
}
</style>
