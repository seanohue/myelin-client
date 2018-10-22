import partialRight from 'lodash/partialRight'
import map from 'lodash/map'
import find from 'lodash/find'

const AudioPlugin = {
  install (Vue) {
    Vue.prototype.$audio = new MyelinAudio()
  }
}

class MyelinAudio {
  init () {
    return import('howler')
      .then(({ Howl, Howler }) => {
        this.Howl = Howl
        this.Howler = Howler
        this.setupTracks()
        return this.setupPlayers()
          .then(() => {
            this.playAmbient()
            return this
          })
      })
  }

  setupTracks () {
    const tracks = [
      'tubestatic'
    ]

    const processTracks = partialRight(map, this.processTrack)
    this.tracks = processTracks(tracks)
    return this.tracks
  }

  processTrack (trackname) {
    return ({
      name: trackname,
      fetch: () => import(`@/assets/${trackname}.ogg`)
    })
  }

  findTrack (trackname) {
    return find(this.tracks, {name: trackname})
  }

  setupPlayers () {
    return this.initAmbient()
      .then(this.initMusic.bind(this))
  }

  initAmbient () {
    const initial = this.findTrack('tubestatic')
    const fetchInitial = initial.fetch
    if (!fetchInitial) return Promise.resolve()
    return fetchInitial()
      .then((src) => {
        initial.data = src.default
        this.ambient = new this.Howl({
          src: [src.default],
          loop: true,
          preload: true,
          volume: 0.25,
          onplayerror (id, err) {
            console.log(`[Audio] PlayError: ${id} -- `, err)
          }
        })
      })
  }

  initMusic () {
    // this.music = new this.Howl({
    //   src: [],
    //   loop: true,
    //   volume: 0.5
    // })
    return Promise.resolve()
  }

  playAmbient () {
    if (!this.ambient) return false
    return this.ambient.play()
  }
}

export default AudioPlugin
