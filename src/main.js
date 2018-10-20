import Vue from 'vue'
import HeroPatterns from 'vue2-heropatterns'

import App from './App.vue'
import router from './router'

import Socket from './plugins/socket'
import EventBus, {bus} from './plugins/bus'
import Ansi from './plugins/ansi'
import Howl from './plugins/audio'

const hostname = 'myelin.space'
const port = 4001

Vue.config.productionTip = false

Vue.use(EventBus)
Vue.use(Socket, { bus, hostname, port })
Vue.use(Ansi)
Vue.use(HeroPatterns)
Vue.use(Howl)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
