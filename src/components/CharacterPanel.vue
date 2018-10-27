<template>
  <MyelinPanel
    v-if="hasCharacterData"
    :title="title"
    :position="position"
    :size="size"
    :customhandles="['tl', 'tr']"
  >
    <PanelTabs :tabs="tabs">
      <component :is="activePanel"></component>
    </PanelTabs>
  </MyelinPanel>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  components: {
    MyelinPanel,
    PanelTabs: () => import('@/components/PanelTabs'),
    StatsPanel: () => import('@/components/StatsPanel'),
    EffectsPanel: () => import('@/components/EffectsPanel')
  },

  data () {
    return {
      title: 'VËSŚÊL MONIT0R',
      size: {w: 325, h: 600, minh: 200, minw: 200},
      position: {x: 620, y: 100},
      stats: {},
      effects: {},
      lastEffect: '',
      activePanel: 'StatsPanel',
      tabs: [{
        name: 'STATÜS',
        component: 'StatsPanel'
      }, {
        name: 'CØNDITIONS',
        component: 'EffectsPanel'
      }]
    }
  },

  computed: {
    hasCharacterData () {
      return !isEmpty(this.stats) && !isEmpty(this.effects)
    }
  },

  created () {
    this.$on('tab', (tabComponent) => {
      this.activePanel = tabComponent
    })

    this.$bus.$on('stats:change', (data) => {
      if (data) {
        this.stats = data
      }
    })

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

.stats-container {
  .panel-content-container()
}
</style>
