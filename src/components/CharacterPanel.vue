<template>
  <MyelinPanel
    v-if="hasCharacterData"
    :title="title"
    :position="position"
    :size="size"
    :customhandles="['tl', 'tr']"
  >
    <PanelTabs class="character-panel-container" @tab="switchTab($event)" :tabs="tabs" :activePanel="activePanel">
      <keep-alive>
        <component :is="activePanel" :stats="stats" :effects="effects">
        </component>
      </keep-alive>
    </PanelTabs>
  </MyelinPanel>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import MyelinPanel from '@/components/MyelinPanel'
import PanelTabs from '@/components/PanelTabs'
import StatsPanel from '@/components/StatsPanel'
import EffectsPanel from '@/components/EffectsPanel'

export default {
  components: {
    MyelinPanel,
    PanelTabs,
    StatsPanel,
    EffectsPanel
  },

  data () {
    return {
      title: 'VËSŚEL MONIT0R',
      size: {w: 325, h: 600, minh: 200, minw: 200},
      position: {x: 620, y: 100},
      stats: {health: {type: 'pool', current: 5, max: 10}},
      effects: {},
      lastEffect: '',
      activePanel: 'stats-panel',
      tabs: [{
        name: 'STATÜS',
        component: 'stats-panel'
      }, {
        name: 'CØNDITIONS',
        component: 'effects-panel'
      }]
    }
  },

  computed: {
    hasCharacterData () {
      return !isEmpty(this.stats)
    }
  },

  methods: {
    switchTab (which) {
      this.activePanel = which
    }
  },

  created () {
    this.$bus.$on('stats:change', (data) => {
      if (data) {
        console.log('new stats')
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

.character-panel-container {
  .panel-content-container()
}
</style>
