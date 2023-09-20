import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import TodoEditeView from '../views/TodoEditeView.vue'
import TestView from '../views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'todos',
      component: TodoView
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    },
    {
      path: '/todo/:id/edite',
      name: 'todoEdite',
      component: TodoEditeView
    },    
   
  ]
})

export default router
