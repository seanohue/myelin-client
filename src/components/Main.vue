<template>
  <div class="terminal-container">
    <virtual-list
      :size="40"
      :remain="20"
      class="terminal-messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="terminal-message">
        {{ansi(message)}}
      </div>
    </virtual-list>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'

export default {
  name: 'Main',
  components: { 'virtual-list': virtualList },

  data () {
    return {
      connected: false,
      messages: ['Connecting...']
    }
  },

  created () {
    this.$bus.$on('connected', () => {
      console.log('connected')
      this.connected = true
      this.messages.push('Connected!')
    })

    this.$bus.$on('message', m => {
      console.log(m)
      const message = JSON.parse(m.data)
      if (message.type === 'message') {
        this.outputMessage(message)
      }
    })

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
    ansi (message) {
      const ansied = this.$ansi.ansi_to_html(message)
      console.log({original: message, ansied})
      return ansied
    },

    outputMessage (message) {
      const messages = message.message
        .trim()
        // Line breaks
        .split('\r\n')
      this.messages = this.messages.concat(messages)
      console.log({msg: this.messages})
      return messages
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.terminal-container {
  flex: 1;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  white-space: pre-wrap;
  background-color: #24282a;
  color: #e0e0e0;
  padding: 8px;
  overflow-y: auto;
  margin-top: 48px;
  text-align: left;
}
</style>
