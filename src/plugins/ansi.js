import Ansi from 'ansi_up'

const ansi = new Ansi()
ansi.use_classes = true
ansi.escape_for_html = false

const AnsiPlugin = {
  install (Vue) {
    Vue.prototype.$ansi = ansi
  }
}

export default AnsiPlugin
