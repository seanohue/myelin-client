<template>
  <div class="game-input">
    <form @submit.prevent="enter">
      <input
        v-model.trim="userInput"
        class="game-input-field"
        @keydown.enter="enter"
      />
    </form>
  </div>
</template>

<script>

export default {
  name: 'GameInput',

  data () {
    return {
      userInput: '',
      // Use Vuex for this eventually
      history: []
    }
  },

  created () {
    this.$bus.$on('error', e => {
      this.connected = false
      this.messages.push(e)
    })

    this.$bus.$on('disconnected', () => {
      this.connected = false
      this.messages.push('Disconnected.')
    })
  },

  methods: {
    clear () {
      this.userInput = ''
    },

    enter (event) {
      event.preventDefault()

      const msg = this.userInput
      console.log({msg}, this.userInput)
      this.history.push(msg)
      this.$socket.send(msg)

      this.clear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.game-input {
  display: block;
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  height: 32px;
  width: 80%;
  padding: 8px;
  background-color: #24282a;
}
.game-input-field {
  width: 100%;
  height: 100%
}
</style>
