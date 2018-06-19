import Vue from 'vue'
import Router from 'vue-router'
import Game from './views/Game.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Game
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
