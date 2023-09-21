import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import TodoEditeView from '../views/TodoEditeView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: TodoView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/todo/:id/edite',
      name: 'todoEdite',
      component: TodoEditeView
    },    
   
  ]
})

export default router
