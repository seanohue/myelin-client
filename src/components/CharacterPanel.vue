<template>
  <MyelinPanel
    v-if="hasCharacterData"
    :title="title"
    :position="position"
    :size="size"
    :customhandles="['tl', 'tr']"
  >
    <div class="stats-container">
      <StatBar v-for="(stat, i) in sortedStats"
        :key="i"
        :stat="stat"
        :name="stat.name">
      </StatBar>
    </div>
  </MyelinPanel>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  components: {
    MyelinPanel,
    StatBar: () => import('@/components/StatBar')
  },

  data () {
    return {
      title: 'VËSŚÊL MONIT0R', // STATÜS
      size: {w: 325, h: 600, minh: 200, minw: 200},
      position: {x: 620, y: 100},
      stats: {},
      effects: {}
    }
  },

  computed: {
    hasCharacterData () {
      return !isEmpty(this.stats) && !isEmpty(this.effects)
    }
  },

  created () {
    this.$bus.$on('stats:change', (data) => {
      if (data) {
        this.stats = data
      }
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
