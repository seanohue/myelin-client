<template>
  <div class="game-input">
    <form @submit.prevent="enter">
      <input
        v-model.trim="userInput"
        class="game-input-field"
        @keydown.enter="enter"
        disabled="disabled"
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

  computed: {
    disabled () {
      return this.$socket.readyState !== this.$socket.OPEN
    }
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
  flex: 1;
  display: flex;
  height: 32px;
  padding: 8px;
  background-color: #24282a;
}

.game-input:focus {
  border-style: none;
}

form {
  width: 100%;
}

.game-input-field:focus {
  box-shadow: 0 0 5px rgb(81, 238, 131);
  border-color: rgb(81, 238, 120);
}

.game-input-field {
  -webkit-transition: all 0.30s ease-in-out;
  -moz-transition: all 0.30s ease-in-out;
  -ms-transition: all 0.30s ease-in-out;
  -o-transition: all 0.30s ease-in-out;
  transition: all 0.30s ease-in-out;

  border-style: groove;
  border-color: #6bc26b;

  width: 100%;
  height: 100%;
  flex-grow: 1;

  background-color: #00410056;
  color: rgb(221, 235, 222);

  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  padding: 4px 0 0 4px;
  margin-right: 4px;
}
</style>
