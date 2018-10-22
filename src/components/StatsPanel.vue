<template>
  <MyelinPanel
    v-if="hasStats"
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
import isEmpty from 'lodash-es/isEmpty'
import map from 'lodash-es/map'
import sortBy from 'lodash-es/sortBy'
import MyelinPanel from '@/components/MyelinPanel'
import StatBar from '@/components/StatBar'

export default {
  components: {MyelinPanel, StatBar},

  data () {
    return {
      title: 'STATÜS MONITOR',
      size: {w: 325, h: 600, minh: 200, minw: 200},
      position: {x: 620, y: 100},
      stats: {}
    }
  },

  computed: {
    hasStats () {
      return !isEmpty(this.stats)
    },

    sortedStats () {
      const named = map(this.stats, (stat, name) => {
        stat.name = name
        return stat
      })
      const sorted = sortBy(named, 'type')
      sorted[sorted.length - 1].isLast = true
      return sorted
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
