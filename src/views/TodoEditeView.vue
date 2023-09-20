
<script setup>
import { useRoute, useRouter} from 'vue-router'
import {onMounted , ref, reactive} from 'vue'
import {useTodoStore} from '../stores/todo'

const todoStore = useTodoStore()
const route = useRoute()
const router = useRouter()

const todoId = ref(-1)
const todoData = reactive({
  name: '',
  status: ''
})

onMounted( async ()=>{
  try {
    todoId.value = parseInt(route.params.id)
    await todoStore.loadTodo(todoId.value)
    todoData.name = todoStore.selectTodo.name
    todoData.status = todoStore.selectTodo.status
  } catch (error) {
    console.log('error',error)
  }
})

const editTodo = async (todoData, todoId)=>{
  try {
    
    await todoStore.editTodo(todoData, todoId)
    router.push({name:'todos'})

  } catch (error) {
    console.log('error',error)
  }
}
</script>
<template>
  <div>
    Edit

    <div>
      <input type="text" v-model="todoData.name">
    </div>
    <div>
      <input type="text"  v-model="todoData.status">
    </div>
    <select name="" id="" v-model="todoData.status">
      <option v-for="st in todoStore.statuses" :key="st" :value="st"> {{ st }}</option>
    </select>

    <button @click="editTodo(todoData, todoId)" >save</button>
  </div>
</template>