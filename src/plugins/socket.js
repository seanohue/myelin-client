const WebsocketPlugin = {
  install (Vue, options = {}) {
    const {
      hostname = 'localhost',
      port = '4001',
      bus
    } = options

    const socket = {
      init () {
        console.log('Socket initiated...')
        Object.assign(
          Vue.prototype.$socket,
          new WebSocket(`ws://${hostname}:${port}`)
        )
        socket.onopen = () => bus.$emit('connected')
        socket.onclose = () => bus.$emit('disconnected')
        socket.onerror = (e) => bus.$emit('error', e)
        socket.onmessage = (m) => bus.$emit('message', m)

        bus.$on('connected', () => console.log('Connected'))
        bus.$on('message', console.log)
      }
    }
    Vue.prototype.$socket = socket
  }
}

export default WebsocketPlugin
