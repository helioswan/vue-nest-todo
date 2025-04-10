import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards/auth.guard'
import SigninView from '../views/SigninView.vue'
import SignupView from '../views/SignupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: [authGuard],
      component: () => import('../views/HomeView.vue'),
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
  ],
})

export default router
