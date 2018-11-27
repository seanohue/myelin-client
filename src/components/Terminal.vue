<template>
  <MyelinPanel
    :title="title"
    :size="termsize"
    :position="termposition"
    :customhandles="['ml', 'mr', 'tm', 'bm']"
    :minimizable="false"
  >
    <div class="terminal-container">
      <VirtualList
        ref="messages"
        :size="25"
        :remain="25"
        :bench="100"
        :start="0"
        class="terminal-messages">
        <span
          v-for="(message, index) in messages"
          :key="index"
          class="terminal-message"
          v-html="ansi(message)"/>
      </VirtualList>
      <GameInput/>
    </div>
  </MyelinPanel>
</template>

<script>
import pkg from '@/../package.json'
import VirtualList from 'vue-virtual-scroll-list'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  name: 'Terminal',
  components: {
    GameInput: () => import('@/components/GameInput'),
    VirtualList,
    MyelinPanel
  },

  data () {
    return {
      connected: false,
      messages: [],
      title: `VESSEL ACCESS TERMINAL v${pkg.version || 'X.X.X'}`,
      termsize: {
        w: 620,
        h: Math.min(620, Math.max(200, window.innerHeight - 100)),
        minh: 200,
        minw: 350
      },
      termposition: {
        x: 0,
        y: 0
      }
    }
  },

  created () {
    this.$bus.$on('connected', () => {
      this.connected = true
      this.outputMessage('Linked!\n')
    })

    this.$bus.$on('error', e => {
      this.connected = false
      this.outputMessage('Unable to link to vessel.\n')
    })

    this.$bus.$on('disconnected', () => {
      this.connected = false
      this.outputMessage('Unlinked.\n')
    })

    this.$bus.$on('ui:output', (msg) => this.outputMessage(msg))
    this.$bus.$on('ui:scroll', () => this.scrollDown())

    this.$socket.init()
    this.outputMessage('Linking to vessel...\n')
  },

  methods: {
    ansi (message) {
      const ansied = this.$ansi.ansi_to_html(message)
      return ansied
    },

    outputMessage (message) {
      this.messages = this.messages.concat(message)
      this.scrollDown(this.messages)
      return this.messages
    },

    scrollDown (messages) {
      this.$nextTick(() => {
        if (!this.$refs.messages) return

        const {scrollHeight} = this.$refs.messages.$el
        this.$refs.messages.$el.scrollTop = scrollHeight
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../app.less';

.terminal-container {
  .panel-content-container()
}

.terminal-messages::-webkit-scrollbar-track {
  .subtle-inner-shadow(@scrollbar-shadow, 6px);
  border-style: groove;
  background-color: @term-background;
}

.terminal-messages::-webkit-scrollbar {
  width: 12px;
  background-color: @term-background;
}

.terminal-messages::-webkit-scrollbar-thumb {
  border-style: groove;
  .subtle-inner-shadow(@scrollbar-shadow, 6px);
  background-color: @scrollbar-thumb;
}
</style>
