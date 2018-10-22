import Vue from 'vue'
import Router from 'vue-router'

const Game = () => import('./views/Game.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Game
    }
  ]
})
