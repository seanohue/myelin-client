// import partialRight from 'lodash/partialRight'
// import map from 'lodash/map'
// import filter from 'lodash/filter'
// import find from 'lodash/find'
// import bind from 'lodash/bind'
// import get from 'lodash/get'
// import capitalize from 'lodash/capitalize'

import tracks from '@/data/tracks'
import {bus} from './bus'

import {AudioPlugin} from 'vue-howler-bus'
const plugin = AudioPlugin(tracks, bus)

export default plugin

// const AudioPlugin = {
//   install (Vue) {
//     Vue.prototype.$audio = new MyelinAudio(bus)
//   }
// }

// class MyelinAudio {
//   constructor ($bus) {
//     this.$bus = $bus
//   }

//   init () {
//     return import('howler')
//       .then(bind(this.initHowler, this))
//       .then(bind(this.setupTracks, this))
//       .then(bind(this.setupPlayers, this))
//       .then(() => {
//         this.initSettings()
//         this.initEvents()
//         this.ambient.play()
//         this.music.play()
//         this.sfx.play()
//         return this
//       })
//   }

//   initHowler ({Howl, Howler}) {
//     this.Howl = Howl
//     this.Howler = Howler
//     return this
//   }

//   setupTracks () {
//     const processTracks = partialRight(map, this.processTrack)
//     this.tracks = processTracks(tracks)
//     return this.tracks
//   }

//   processTrack (track) {
//     track.fetch = () => import(`@/assets/${track.name}.ogg`)
//     return track
//   }

//   setupPlayers () {
//     return Promise.all([
//       this.initAmbient(),
//       this.initMusic(),
//       this.initSfx()
//     ])
//   }

//   initAmbient () {
//     const initial = this.findTrack('tubestatic')
//     return this.createPlayer('ambient', initial)
//       .then(howl => {
//         this.ambient = howl
//         return this
//       })
//   }

//   initMusic () {
//     const initial = this.findTrack('VESSELACCESS')
//     return this.createPlayer('music', initial)
//       .then(howl => {
//         this.music = howl
//         return this
//       })
//   }

//   initSfx () {
//     const initial = this.findTrack('osstart')
//     return this.createPlayer('sfx', initial)
//       .then(howl => {
//         this.sfx = howl
//         return this
//       })
//   }

//   findTrack (trackname) {
//     return find(this.tracks, {name: trackname})
//   }

//   createPlayer (player, track) {
//     const initTrack = track.src
//       ? bind(Promise.resolve, Promise, track.src)
//       : () => track.fetch().then(imported => imported.default)

//     const currentlyMuted = get(this, 'settings.muted', false)

//     return initTrack()
//       .then(src => {
//         return new this.Howl({
//           src: [src],
//           loop: player !== 'sfx',
//           preload: true,
//           mute: currentlyMuted,
//           rate: track.rate || 1,
//           volume: track.volume || this.getVolume(player),
//           onloaderror (id, err) {
//             return this.logError(player, `LoadError: ${id} -- ${err}`)
//           },
//           onplayerror (id, err) {
//             return this.logError(player, `PlayError: ${id} -- ${err}`)
//           }
//         })
//       })
//   }

//   initSettings () {
//     this.settings = {
//       muted: false,
//       musicVolume: 1,
//       sfxVolume: 1,
//       ambientVolume: 1
//     }

//     this.emitSettings()
//   }

//   handleSettingsChange (settings) {
//     if (!settings) return

//     Object.assign(this.settings, settings)

//     if (typeof settings.muted === 'boolean') {
//       this.eachPlayer(player => { player.mute = settings.muted })

//       if (settings.muted) {
//         this.stopAll()
//       } else {
//         this.eachPlayer(player => { player.mute = false })
//         this.playAll()
//       }
//     }
//   }

//   initEvents () {
//     this.$bus.$on('settings:init', () => this.emitSettings())
//     this.$bus.$on('audio:change', ({settings, cue, options}) => {
//       console.log('Audio Change:', {cue, options, settings})
//       if (settings) return this.handleSettingsChange(settings)
//       return this.handleAudioChange(cue, options)
//     }
//     this.$bus.$on('audio:play', (player, trackname) => this.playTrack(player, trackname))
//   }

//   handleAudioChange (cue, options) {
//     if (!cue) return this.logError('SYSTEM', 'Audio change sent with no cue!')

//     if (options.stop) {
//       if (cue === 'all') return this.stopAll()
//       return this.eachPlayer((player, type) => type === cue && player.stop())
//     }

//     const track = this.findTrack(cue)
//     if (!track) return this.logError('SYSTEM', `Track not found for cue: ${cue}.`)
//     const {type, name} = track
//     return this.playTrack(type, name)
//   }

//   stopAll () {
//     this.eachPlayer(player => player.stop())
//   }

//   playAll () {
//     this.eachPlayer((player, type) => type !== 'sfx' && player.play())
//   }

//   eachPlayer (cb) {
//     const existingPlayers = filter(['ambient', 'music', 'sfx'], (player) => this[player])
//     return map(existingPlayers, (player) => cb(this[player], player))
//   }

//   emitSettings () {
//     this.$bus.$emit('audio:init', {settings: this.settings})
//   }

//   playTrack (player, trackname) {
//     const track = this.findTrack(trackname)
//     if (!track) {
//       return this.logError(player, `TrackNotFoundError: ${trackname}}`)
//     }
//     if (!this[player]) {
//       return this.logError(player, `PlayerNotFoundError: ${player} uninitialized`)
//     }

//     this[player].stop()

//     return this.createPlayer(player, track)
//       .then((howl) => {
//         this[player] = howl
//         this[player].play()
//         return this
//       })
//   }

//   getVolume (player) {
//     return {
//       music: 0.75,
//       ambient: 0.5,
//       sfx: 1
//     }[player] || 1
//   }

//   logError (type, message) {
//     return console.warn(`[${capitalize(type)} Audio] ${message}`)
//   }
// }

// export default AudioPlugin
