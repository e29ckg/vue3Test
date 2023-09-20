<script setup>
import { onMounted } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import {useRoute} from 'vue-router'

onMounted( () => {
  const route = useRoute()
 console.log(route.params)
  
  
})
</script>

<template>
  <main>
    <TheWelcome />

  </main>
</template>
