<script setup lang="ts">
import type { TranslateTextType } from '@/types'
import { inject, onMounted, ref } from 'vue'
import { BsGithub } from 'vue-icons-plus/bs'
import { ImMail4 } from 'vue-icons-plus/im'

// https://api.github.com/users/${user.name}
const author = ref<{
  name: string
  avatar_url: string
  followers: number
  html_url: string
} | null>(null)
const translateText = inject<TranslateTextType>(
  'translateText',
  (title: string) => title,
)

onMounted(async () => {
  const res = await fetch(`https://api.github.com/users/jssosoTo`)
  const data = await res.json()
  if (data) author.value = data
})
</script>

<template>
  <div class="w-full h-full p-4">
    <div v-if="author?.name">
      <h1
        class="text-3xl header text-center animate__animated animate__bounce overflow-hidden"
      >
        About Author
      </h1>
      <section
        class="flex items-center w-3/4 m-auto intro animate__animated animate__rubberBand"
      >
        <div class="w-1/3 flex justify-center items-center">
          <img
            v-if="author?.avatar_url"
            :src="author?.avatar_url"
            class="w-2/3 aspect-square rounded-full"
          />
        </div>
        <div class="w-2/3 flex flex-col gap-2 text-2xl">
          <div class="flex items-center">
            <label class="inline-block w-64">Name: </label>
            <span>{{ author?.name }}</span>
          </div>
          <div class="flex items-center">
            <label class="inline-block w-64">Github Followers: </label>
            <span>{{ author?.followers }}</span>
          </div>
          <div class="flex items-center">
            <label class="inline-block w-64">Contact Me: </label>
            <div class="flex items-center gap-2">
              <a class="inline" v-if="author?.html_url" :href="author?.html_url"
                ><BsGithub
              /></a>
              <a class="inline" href="mailTo:3237313135@qq.com"><ImMail4 /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <hr class="my-4" v-if="author" />
    <div>
      <h1
        class="text-3xl header text-center animate__animated animate__backInLeft mt-4 overflow-hidden"
      >
        About App
      </h1>
      <div class="flex flex-col gap-4">
        <section
          class="w-2/3 m-auto intro animate__animated animate__backInRight"
        >
          <h2 class="text-2xl inline-block border-b border-dashed">
            1. The purpose of building this website
          </h2>
          <p class="text-xl paragraph">
            This is my first large-scale project by Vue3.0+, There are a lot of
            techniques used inside that I haven't used before, so I cannot
            guarantee the quality of the code😶.If you have any questions,
            please contact me on the
            <a href="https://github.com/jssosoTo/ListTalk_Vue" class="underline"
              >Github</a
            >.
          </p>
        </section>
        <section
          class="w-2/3 m-auto intro animate__animated animate__backInRight"
        >
          <h2 class="text-2xl inline-block border-b border-dashed">
            2. How to use
          </h2>
          <p class="text-xl paragraph">
            Click '{{ translateText('addTask') }}' button for add a task. And
            then, it will shows a modal with form, enter content to add a
            Task.<br />
          </p>
          <p class="text-xl paragraph">
            If you have tasks, you can see it in the '{{
              translateText('today')
            }}' page. This page contains any type of task. But if you check the
            task in any page, it will be in the '{{ translateText('recycle') }}'
            page. In the '{{ translateText('recycle') }}' page contains all
            checked tasks, and you have the chance to withdraw it or permanently
            delete it.
          </p>
          <p class="text-xl paragraph">
            Also you can add a project for sort in the left sidebar. And the
            tasks could be classified under the project for quickly find.
          </p>
        </section>
        <section
          class="w-2/3 m-auto intro animate__animated animate__backInRight"
        >
          <h2 class="text-2xl inline-block border-b border-dashed">
            3. What technology stacks and package were used in this project
          </h2>
          <p class="text-xl paragraph">
            Vue3、Pinia、Vue Router、Animate.CSS、Tailwind
            CSS、Day.js、classNames、Vue-Icons
          </p>
          <p class="text-xl paragraph">
            This project is pure front-end develop, which means the data of
            tasks were store in the local-storage.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  overflow-x: hidden !important;
}

.header {
  font-family: 'Indie Flower', cursive;
}
.intro {
  font-family: 'Do Hyeon', sans-serif;
}

.paragraph {
  text-indent: 2ch;
}
</style>
