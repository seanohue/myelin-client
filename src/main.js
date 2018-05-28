import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Socket from './plugins/socket'
import EventBus, {bus} from './plugins/bus'
import Ansi from './plugins/ansi'

const hostname = 'localhost'
const port = 4001

Vue.config.productionTip = false

Vue.use(EventBus)
Vue.use(Socket, { bus, hostname, port })
Vue.use(Ansi)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
