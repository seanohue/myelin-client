<template>
  <div class="terminal-container">
    <VirtualList
      :size="20"
      :remain="20"
      :bench="20"
      :start="0"
      :onscroll="scroll"
      ref="messages"
      class="terminal-messages">
      <span
        v-html="ansi(message)"
        v-for="(message, index) in messages"
        :key="index"
        class="terminal-message"></span>
    </VirtualList>
    <GameInput></GameInput>
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'
import GameInput from '@/components/GameInput'

import _ from 'lodash'

export default {
  name: 'Terminal',
  components: { VirtualList, GameInput },

  data () {
    return {
      connected: false,
      messages: []
    }
  },

  created () {
    console.log('Terminal Component Created..')

    this.$bus.$on('connected', () => {
      this.connected = true
      this.outputMessage('Connected!')
    })

    this.$bus.$on('message', m => {
      const message = JSON.parse(m.data)
      console.log({message})
      this.handleMessage(message)
    })

    this.$bus.$on('error', e => {
      this.connected = false
      this.outputMessage('Unable to connect to server.')
    })

    this.$bus.$on('disconnected', () => {
      this.connected = false
      this.outputMessage('Disconnected.')
    })

    this.$socket.init()
    this.outputMessage('Initializing...')
  },

  computed: {
    messagesEl () {
      return _.get(this, '$refs.messages.$el', {})
    },
    scrolled () {
      const messagesEl = this.messagesEl
      const { scrollHeight, scrollTop } = messagesEl
      return scrollHeight > scrollTop
    }
  },

  methods: {
    ansi (message) {
      const ansied = this.$ansi.ansi_to_html(message)
      return ansied
    },

    handleMessage (message) {
      switch (message.type) {
        case 'message':
          return this.outputMessage(message.message)
        case 'ui':
          return this.$bus.$emit('uiChange', message.data)
        case 'data':
          return this.$bus.$emit('dataChange', message.data)
        default:
          return console.log('Unsupported message type: ', message.type)
      }
    },

    outputMessage (message) {
      this.messages = this.messages.concat(message)
      this.scrollDown()
      return this.messages
    },

    scroll () {},

    scrollDown () {
      this.$nextTick(() => {
        this.messagesEl.scrollTop = this.messagesEl.scrollHeight
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.terminal-container {
  border-style: groove;

  display: flex;
  flex: 1;
  flex-direction: column;

  font-family: "Roboto Mono", monospace;
  font-size: 14px;
  text-align: left;

  white-space: pre-wrap;
  background-color: #24282a;
  color: #e0e0e0;

  padding: 8px;
  overflow-y: auto;
  margin-top: 48px;
}

.terminal-messages::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-style: groove;
  background-color: #24282a;
}

.terminal-messages::-webkit-scrollbar {
  width: 12px;
  background-color: #24282a;
}

.terminal-messages::-webkit-scrollbar-thumb {
  border-style: groove;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(221, 235, 222);
}
</style>
