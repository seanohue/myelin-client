<template>
  <div class="main">
    <Terminal/>
  </div>
</template>

<script>
import Terminal from '@/components/Terminal'
export default {
  name: 'home',
  components: {
    Terminal
  }
}
</script>

<style>
.main {
  display: flex;
}
</style>
