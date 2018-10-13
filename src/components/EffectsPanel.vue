<template>
  <MyelinPanel
    v-if="hasEffects"
    title="PRES▒NT CØNDITIONS"
    :position="position"
    :size="size"
    :customhandles="['tl', 'tr']"
  >
    <div class="effects-container">
      <EffectBlock></EffectBlock>
    </div>
  </MyelinPanel>
</template>

<script>
import _ from 'lodash'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  components: {MyelinPanel},
  data () {
    return {
      size: {w: 600, h: 325, minh: 200, minw: 200},
      position: {x: 600, y: 600},
      effects: {}
    }
  },

  computed: {
    hasEffects () {
      return !_.isEmpty(this.effects)
    }
  },

  created () {
    this.$bus.$on('effects:change', (data) => {
      if (!data) return
      console.log('maybe fx', data)
      this.effects = data
    })
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.stats-container {
  .panel-content-container()
}
</style>
