<template>
  <div class="home">
    <img src="../assets/logo.png">
    <Main msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Main from '@/components/Main.vue'

export default {
  name: 'home',
  components: {
    Main
  }
}
</script>
