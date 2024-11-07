import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '@/views/ProjectView.vue'
import Recycle from '@/views/Recycle.vue'
import Calendar from '@/views/Calendar.vue'
import OutdateView from '@/views/OutdateView.vue'
import Search from '@/views/Search.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/about',
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },
    {
      path: '/today',
      name: 'Today',
      component: HomeView,
    },
    {
      path: '/outdate',
      name: 'Outdate',
      component: OutdateView,
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
