<template>
  <div class="game-input">
    <form @submit.prevent="enter">
      <label for="game-input">
        <input v-focus
          name="game-input"
          autocomplete="nope"
          class="game-input-field"
          :type="type"
          v-model.trim="userInput"
          @keydown.enter="enter"
          @keydown.up="traverseHistory('up')"
          @keydown.down="traverseHistory('down')"
        />
      </label>
    </form>
  </div>
</template>

<script>
import * as _ from '_'

export default {
  name: 'GameInput',

  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },

  created () {
    this.$bus.$on('ui:change', (changes) => {
      if (_.has(changes, 'mask')) {
        this.masked = _.get(changes, 'mask')
      }
    })
  },

  data () {
    return {
      masked: false,
      userInput: '',
      // Use Vuex for this eventually
      historyIndex: 0,
      history: []
    }
  },

  computed: {
    disabled () {
      return !this.$socket.isReady()
    },
    type () {
      if (this.masked) {
        return 'password'
      }
      return 'text'
    }
  },

  methods: {
    clear () {
      this.userInput = ''
      this.masked = false
    },

    enter (event) {
      event.preventDefault()
      if (this.disabled) return

      const msg = this.userInput
      this.$socket.send(msg)

      if (!this.masked) {
        this.history.push(msg)
        if (this.history.length > 80) {
          this.history.shift()
        }
      }
      this.clear()
    },

    traverseHistory (direction) {
      const inc = direction === 'up' ? -1 : 1
      this.historyIndex += inc
      this.userInput = this.history[this.historyIndex]
    }
  }
}
</script>

<style scoped lang="less">
@import '../app.less';

.game-input {
  flex: 1;
  display: flex;
  height: 32px;
  padding: 8px 8px 8px 0px;
  background-color: #24282a;
}

.game-input:focus {
  border-style: none;
}

form {
  width: 100%;
}

input.game-input-field:focus {
  box-shadow: 0 0 5px rgb(81, 238, 131);
  border-color: rgb(81, 238, 120);
  outline: 0 none;
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
