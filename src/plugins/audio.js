import partialRight from 'lodash/partialRight'
import map from 'lodash/map'
import find from 'lodash/find'
import bind from 'lodash/bind'
import capitalize from 'lodash/capitalize'

import tracks from '@/data/tracks'

const AudioPlugin = {
  install (Vue) {
    Vue.prototype.$audio = new MyelinAudio()
  }
}

class MyelinAudio {
  init () {
    return import('howler')
      .then(bind(this.initHowler, this))
      .then(bind(this.setupTracks, this))
      .then(bind(this.setupPlayers, this))
      .then(() => {
        this.ambient.play()
        this.music.play()
        return this
      })
  }

  initHowler ({Howl, Howler}) {
    this.Howl = Howl
    this.Howler = Howler
    return this
  }

  setupTracks () {
    const processTracks = partialRight(map, this.processTrack)
    this.tracks = processTracks(tracks)
    return this.tracks
  }

  processTrack (track) {
    track.fetch = () => import(`@/assets/${track.name}.ogg`)
    return track
  }

  setupPlayers () {
    return Promise.all([
      this.initAmbient(),
      this.initMusic()
    ])
  }

  initAmbient () {
    const initial = this.findTrack('tubestatic')
    return this.createPlayer('ambient', initial)
      .then(howl => {
        this.ambient = howl
        return this
      })
  }

  initMusic () {
    const initial = this.findTrack('VESSELACCESS')
    return this.createPlayer('music', initial)
      .then(howl => {
        this.music = howl
        return this
      })
  }

  findTrack (trackname) {
    return find(this.tracks, {name: trackname})
  }

  createPlayer (player, track) {
    const initTrack = track.src
      ? bind(Promise.resolve, Promise, track.src)
      : () => track.fetch().then(imported => imported.default)

    return initTrack()
      .then(src => {
        return new this.Howl({
          src: [src],
          loop: player !== 'sfx',
          preload: true,
          rate: track.rate || 1,
          volume: track.volume || this.getVolume(player),
          onloaderror (id, err) {
            return this.logError(player, `LoadError: ${id} -- ${err}`)
          },
          onplayerror (id, err) {
            return this.logError(player, `PlayError: ${id} -- ${err}`)
          }
        })
      })
  }

  playTrack (player, trackname) {
    const track = this.findTrack(trackname)
    if (!track) {
      return this.logError(player, `TrackNotFoundError: ${trackname}}`)
    }
    if (!this[player]) {
      return this.logError(player, 'PlayerNotFoundError: uninitialized')
    }

    this[player].stop()

    return this.createPlayer(player, track)
      .then((howl) => {
        this[player] = howl
        this[player].play()
        return this
      })
  }

  getVolume (player) {
    return {
      music: 0.75,
      ambient: 0.5,
      sfx: 1
    }[player] || 1
  }

  logError (type, message) {
    return console.warn(`[${capitalize(type)} Audio] ${message}`)
  }
}

export default AudioPlugin
