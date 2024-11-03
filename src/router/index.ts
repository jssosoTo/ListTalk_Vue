import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'
import Recycle from '@/views/Recycle.vue'
import Calendar from '@/views/Calendar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/today',
    },
    {
      path: '/today',
      name: 'Today',
      component: HomeView,
    },
    {
      path: '/recycle',
      name: 'recycle',
      component: Recycle,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/projects/:id',
      name: 'projects',
      component: ProjectView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
