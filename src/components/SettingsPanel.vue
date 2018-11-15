<template>
  <MyelinPanel
    v-if="hasSettings"
    :title="title"
    :position="position"
    :size="size"
    :customhandles="['tl', 'tr']"
  >
    <div class="settings-container">
      <form>
        <input
          :value="settings.audio.muted"
          v-model="settings.audio.muted"
          type="checkbox"
          name="mute"
          @change="updateAudioSettings()" >Mute Audio<br>
      </form>
    </div>
  </MyelinPanel>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import MyelinPanel from '@/components/MyelinPanel'

export default {
  components: {MyelinPanel},

  data () {
    return {
      title: 'PREFERENÇE§',
      size: {w: 325, h: 600, minh: 200, minw: 200},
      position: {x: 620, y: 420},
      settings: {
        audio: {
          muted: false
        }
      }
    }
  },

  computed: {
    hasSettings () {
      return !isEmpty(this.settings)
    }
  },

  created () {
    this.$bus.$on('audio:init', ({settings}) => {
      this.settings = Object.assign(this.settings, { audio: settings })
    })
    this.$bus.$emit('settings:init')
  },

  methods: {
    updateAudioSettings () {
      const settings = get(this, 'settings.audio', {})
      this.$bus.$emit('audio:change', {settings})
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.settings-container {
  .panel-content-container()
}
</style>
