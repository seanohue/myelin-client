<template>
  <MyelinPanel
    v-if="hasEffects"
    title="PRES▒NT CØNDITIONS"
    :position="position"
    :size="size"
    :customhandles="['tl', 'tr']"
  >
    <div class="effects-container">
      <EffectBlock
        v-for="(effect, key) in effects"
        :key="key"
        :effect=effect
        :isLast="effect.name === lastEffect">
      </EffectBlock>
    </div>
  </MyelinPanel>
</template>

<script>
import _ from 'lodash'
import MyelinPanel from '@/components/MyelinPanel'
import EffectBlock from '@/components/EffectBlock'

export default {
  components: {MyelinPanel, EffectBlock},
  data () {
    return {
      size: {w: 325, h: 325, minh: 200, minw: 230},
      position: {x: 620, y: 340},
      effects: {},
      lastEffect: ''
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
      this.effects = data
      this.lastEffect = this.effects[this.effects.length - 1].name
    })
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.effects-container {
  .panel-content-container()
}
</style>
