const HowlPlugin = {
  install (Vue) {
    Vue.prototype.$howler = {
      init () {
        return import('howler')
          .then(({Howl, Howler}) => {
            Vue.prototype.$howl = Howl
            Object.assign(
              Vue.prototype.$howler,
              Howler
            )
          })
      }
    }
  }
}

export default HowlPlugin
