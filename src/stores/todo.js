import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://650a6170dfd73d1fab085080.mockapi.io'

export const useTodoStore = defineStore('todo', {
  
  state: () => ({ 
    count: 0, 
    name: 'Eduardo', 
    list:[],
    selectTodo:{},
    statuses:['Panding', 'Doing', 'Done']
  }),
  
  actions: {
    async loadTodos () {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error) {
        console.log('error', error)
      }
    },
    async loadTodo (id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectTodo = response.data
        console.log( response.data)
      } catch (error) {
        console.log('error', error)
      }
    },

    async addTodo (todoText) {
      const bodyData = {
        name: todoText,
        status: 'Panding'
      }
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        console.log(response.data)
        // this.list.push(response.data)
        // this.list = response.data
      } catch (error) {
        console.log('error', error)
      }
    },

    async editTodo (todoData, id) {
      try {
        const bodyData = {
          name: todoData.name,
          status: todoData.status
        }
        const response = await axios.put(`${BASE_URL}/todos/${id}`, bodyData)
        // this.list.splice(index, 1, book)
        console.log(response.data)
      } catch (error) {
        console.log('error', error)
      }
    },
    async removeTodo (id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        // this.list.splice(index, 1)
        // console.log(response.data)
      } catch (error) {
        console.log('error', error)
      }
    }
  },

})
