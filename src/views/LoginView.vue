<template>   
    <div class="relative flex flex-col items-center justify-center h-screen overflow-hidden">
        <div class="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
            <h1 class="text-3xl font-semibold text-center text-gray-700">Pkkjc-Login 2</h1>
            <form class="space-y-4" @submit.prevent="onSubmit()">
                <div>
                    <label class="label">
                        <span class="text-base label-text">Usaername</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        class="w-full input input-bordered" 
                        v-model="username" 
                    />
                </div>
                <div>
                    <label class="label">
                        <span class="text-base label-text">Password</span>
                    </label>
                    <input 
                        type="password" 
                        placeholder="Enter Password"
                        class="w-full input input-bordered" 
                        v-model="password"
                    />
                </div>
                <a href="#" class="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
                <div>
                    <button class="btn btn-block" >Login</button>
                </div>
                {{ username + ' '+password}}
                {{ datas }}
                {{ cookie }}
            </form>
            <button class="btn btn-block" @click="getUser()">getUser</button>
            <button class="btn btn-block" @click="doLogout()">logout</button>
        </div>
    </div>
</template>
<script setup>
import {ref, reactive ,onMounted} from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


const username = ref('admin2')
const password = ref('9929')
const datas = ref([])
const cookie = ref([])

onMounted:{
    cookie.value = document.cookie
    
}
const onSubmit = async () =>{    
    const response = await axios.post('http://localhost:8000/api/login',{
                                    username:username.value, 
                                    password:password.value
                                },{withCredentials:true})
        .then(async (res)=>{
            const resp = res.data
            await Toast.fire({
                icon: 'success',
                title: resp.message
            })
            // window.location.href = '/';
            console.log(resp.message)
        })
        .catch((err) =>{
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            console.log(err.message)
        })

}
const getUser = async () =>{    
    const response = await axios.get('http://localhost:8000/api/users',{withCredentials:true})
                                .then((resp)=>{
                                    datas.value= resp.data
                                })
                                .catch((err)=>{
                                    datas.value= []
                                    console.log(err.message)
                                })

        console.log('data user ',datas.value)


}
const doLogout = async () =>{    
    const response = await axios.get('http://localhost:8000/api/logout',{withCredentials:true})
        console.log('message ',response.data)


}


</script>