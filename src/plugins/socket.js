const WebsocketPlugin = {
  install (Vue, options = {}) {
    const {
      hostname = 'localhost',
      port = '4001',
      bus
    } = options

    const socket = {
      init () {
        const _socket = new WebSocket(`ws://${hostname}:${port}`)
        _socket.onopen = () => bus.$emit('connected')
        _socket.onclose = () => bus.$emit('disconnected')
        _socket.onerror = (e) => bus.$emit('error', e)
        _socket.onmessage = (m) => bus.$emit('message', m)

        socket.send = _socket.send.bind(_socket)

        bus.$on('connected', () => console.log('Connected'))
        bus.$on('message', console.log)
      }
    }
    Vue.prototype.$socket = socket
  }
}

export default WebsocketPlugin
