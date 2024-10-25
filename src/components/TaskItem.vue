<script setup lang="ts">
import { BiCheckCircle, BiCircle } from 'vue-icons-plus/bi'
</script>

<template>
  <div>
    <div class="flex items-center gap-2">
      <button class="checkBtn">
        <BiCheckCircle class="w-0 h-0 check" />
        <BiCircle class="circle" />
      </button>
      <h4 class="overflow-hidden whitespace-nowrap text-ellipsis text-lg">
        十大阿萨是的阿萨德阿萨德as打算打算打算阿达是的asas阿萨是是大啊阿达啊飒飒收到萨达撒大声地撒旦撒阿斯达
      </h4>
    </div>
    <div class="content">
      <p class="overflow-hidden whitespace-nowrap text-ellipsis">
        ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
        ssssssssssssssssssssssss ssssssssssssssssss
      </p>
    </div>
  </div>
</template>

<style>
.circle,
.check {
  color: var(--shade-border-color);
}

.check:hover {
  color: var(--main-color);
}

.circle {
  width: 1.4rem;
  height: 1.4rem;
}

.checkBtn:hover .check {
  width: 1.4rem;
  height: 1.4rem;
}

.checkBtn:hover .circle {
  width: 0;
  height: 0;
}

.content {
  padding-left: 1.9rem;
}

.content p {
  color: var(--shade-text);
}
</style>
