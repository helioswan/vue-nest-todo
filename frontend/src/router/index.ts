import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards/auth.guard'
import SigninView from '../views/SigninView.vue'
import SignupView from '../views/SignupView.vue'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: [authGuard],
      component: HomeView,
    },
    {
      path: '/board/:id',
      name: 'board',
      beforeEnter: [authGuard],
      component: HomeView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SigninView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  ],
})

export default router
