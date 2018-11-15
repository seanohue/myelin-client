<template>
  <div class="effects-container">
    <EffectBlock
      v-for="(effect, key) in effects"
      :key="key"
      :effect="effect"
      :is-last="effect.name === lastEffect"/>
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
    }
  },
  data () {
    return {
      size: {w: 325, h: 325, minh: 200, minw: 230},
      position: {x: 620, y: 340},
      lastEffect: ''
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
