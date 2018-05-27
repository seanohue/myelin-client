import Vue from 'vue'
const bus = new Vue()

const EventBusPlugin = {
  install (_Vue) {
    _Vue.prototype.$bus = bus
  }
}

export {bus}

export default EventBusPlugin
