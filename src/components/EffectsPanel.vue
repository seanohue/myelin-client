<template>
  <div class="effects-container">
    <div v-if="hasEffects">
      <EffectBlock
        v-for="(effect, key) in effects"
        :key="key"
        :effect="effect"
        :is-last="effect.name === lastEffect"/>
    </div>
    <div v-else>
      {{ none }}
    </div>
  </div>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  components: {
    MyelinPanel,
    EffectBlock: () => import('@/components/EffectBlock')
  },
  props: {
    effects: {
      type: Object,
      required: true
    },
    lastEffect: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      size: {w: 325, h: 325, minh: 200, minw: 230},
      position: {x: 620, y: 340},
      none: 'NŒ EFFECTS'
    }
  },

  computed: {
    hasEffects () {
      return !isEmpty(this.effects)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.effects-container {
  .panel-content-container()
}
</style>
