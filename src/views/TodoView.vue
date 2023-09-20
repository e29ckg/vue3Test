<script setup>
import { onMounted, ref  } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useTodoStore } from '../stores/todo'


const todoStore = useTodoStore()
const todoText = ref()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await todoStore.loadTodos()
  // console.log(todoStore.list) มันเป็น proxy = เราก็แก้ผ่านตัวนี้ก็ได้
  isLoading.value = false
})

const addTodo = async (todoText) => {
  isLoading.value = true
  try{
    await todoStore.addTodo(todoText)
    await todoStore.loadTodos()
  }catch(error){
    console.log('error',error)
  }
  isLoading.value = false
}

const doDelete = async (id) => {
  isLoading.value = true
  try{
    await todoStore.removeTodo(id)
    await todoStore.loadTodos()
  }catch(error){
    console.log('error',error)
  }
  isLoading.value = false
}
const onChangeSt = async (todoData, id) => {
  isLoading.value = true
  try{
    await todoStore.editTodo(todoData,id)
    await todoStore.loadTodos()
    // console.log(todoData)
  }catch(error){
    console.log('error',error)
  }
  isLoading.value = false
}
    
</script>


<template>
  <div class="container px-auto min-w-fit justify-self-auto">
    
    <div>

      <input 
      class="input input-bordered input-info w-ful"
      type="text" 
      v-model="todoText"
      >
      <button class="btn btn-outline btn-success ml-2" @click="addTodo(todoText)">เพิ่ม</button>
    </div>

    <div v-if="isLoading">
      Loading...
    </div>
    
    <div class="justify-self-auto">
      <div v-for="(item, index) in todoStore.list" :key="item.id">
        {{index}} {{ item.name }} {{ item.status }}

        <select name="" id="" v-model="item.status" @change="onChangeSt(todoStore.list[index],item.id)">
          <option v-for="st in todoStore.statuses" :key="st" :value="st"> {{ st }}</option>
        </select>
        <RouterLink :to="{name:'todoEdite',params :{id:item.id}}">
          <button>แก้ไข</button>
        </RouterLink>
        <button @click="doDelete(item.id)">ลบ</button>
      
      </div>

    </div>
  </div>
</template>
