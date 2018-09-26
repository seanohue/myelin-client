<template>
  <MyelinPanel
    :size="termsize"
    :customhandles="['ml', 'mr']"
  >
    <div class="terminal-container">
      <VirtualList
        :size="30"
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
  </MyelinPanel>
</template>

<script>
import _ from 'lodash'

import VirtualList from 'vue-virtual-scroll-list'
import GameInput from '@/components/GameInput'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  name: 'Terminal',
  components: { VirtualList, GameInput, MyelinPanel },

  data () {
    return {
      connected: false,
      messages: []
    }
  },

  created () {
    this.$bus.$on('connected', () => {
      this.connected = true
      this.outputMessage('Connected!\n')
    })

    this.$bus.$on('message', m => {
      const message = JSON.parse(m.data)
      this.handleMessage(message)
    })

    this.$bus.$on('error', e => {
      this.connected = false
      this.outputMessage('Unable to connect to server.\n')
    })

    this.$bus.$on('disconnected', () => {
      this.connected = false
      this.outputMessage('Disconnected.\n')
    })

    this.$socket.init()
    this.outputMessage('Initializing...\n')
  },

  beforeDestroy () {
    const NORMAL = 1000
    this.$socket.close(NORMAL, 'Player navigated from page.')
  },

  computed: {
    messagesEl () {
      return _.get(this, '$refs.messages.$el', {})
    },
    scrolled () {
      const messagesEl = this.messagesEl
      const { scrollHeight, scrollTop } = messagesEl
      return scrollHeight > scrollTop
    },
    termsize () {
      return {
        w: window.innerWidth - 24,
        h: window.innerHeight - 8,
        minh: 200,
        minw: 300
      }
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

<style scoped lang="less">
// TODO: Extract to global LESS sheet as needed.
@import '../app.less';

.terminal-container {
  border-style: groove;

  display: flex;
  flex: 1;
  flex-direction: column;

  font-family: "BigBlue Terminal", "Roboto Mono", monospace;
  font-size: 14px;
  text-align: left;

  white-space: pre-wrap;
  background-color: @term-background;
  color: @term-foreground;

  padding: 8px;
  overflow-y: auto;

  .subtle-inner-shadow(@term-foreground)
}

.terminal-messages::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px @scrollbar-shadow;
  box-shadow: inset 0 0 6px @scrollbar-shadow;
  border-style: groove;
  background-color: @term-background;
}

.terminal-messages::-webkit-scrollbar {
  width: 12px;
  background-color: @term-background;
}

.terminal-messages::-webkit-scrollbar-thumb {
  border-style: groove;
  -webkit-box-shadow: inset 0 0 6px @scrollbar-shadow;
  box-shadow: inset 0 0 6px @scrollbar-shadow;
  background-color: @scrollbar-thumb;
}
</style>
