import { createRouter, createWebHistory } from 'vue-router'
import Note from '../views/Note.vue'
import Publish from '../views/publish.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/',
      redirect: '/note'  //路由重定向
      
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    },
    {
      path: '/publish',
      name: 'publish',
      component: Publish
    }
  ],
  default: '/'  //默认路由路径
})

export default router
