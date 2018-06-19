<template>
  <div class="main">
    <Terminal/>
    <GameInput/>
  </div>
</template>

<script>
import Terminal from '@/components/Terminal'
import GameInput from '@/components/GameInput'
export default {
  name: 'home',
  components: {
    Terminal, GameInput
  }
}
</script>
