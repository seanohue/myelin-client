const WebsocketPlugin = {
  install (Vue, options = {}) {
    const {
      hostname = 'localhost',
      port = '4001',
      bus
    } = options

    const socket = new WebSocket(`ws://${hostname}:${port}`)
    Vue.prototype.$socket = socket

    socket.onopen = () => bus.$emit('connected')
    socket.onclose = () => bus.$emit('disconnected')
    socket.onerror = (e) => bus.$emit('error', e)
    socket.onmessage = (m) => bus.$emit('message', m)
  }
}

export default WebsocketPlugin
