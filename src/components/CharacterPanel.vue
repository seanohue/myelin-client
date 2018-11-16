<template>
  <MyelinPanel
    v-if="hasCharacterData"
    :title="title"
    :position="position"
    :size="size"
    :customhandles="['tl', 'tr']"
  >
    <PanelTabs
      :tabs="tabs"
      :active-panel="activePanel"
      class="character-panel-container"
      @tab="switchTab($event)">
      <keep-alive>
        <component
          :is="activePanel"
          :stats="stats"
          :effects="effects"
          :last-effect="lastEffect"/>
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
      size: {w: 325, h: 600, minh: 300, minw: 300},
      position: {x: 620, y: 100},
      stats: {},
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

  created () {
    this.$bus.$on('stats:change', (data) => {
      if (data) {
        this.stats = data
      }
    })

    this.$bus.$on('effects:change', (data) => {
      if (!data) return
      console.log('new effects', data)
      this.effects = data
      this.lastEffect = this.effects[this.effects.length - 1].name
    })
  },

  methods: {
    switchTab (which) {
      this.activePanel = which
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.character-panel-container {
  .panel-content-container()
}
</style>
