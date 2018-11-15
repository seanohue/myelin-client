<template>
  <div class="stats-container">
    <StatBar
      v-for="(stat, i) in sortedStats"
      :key="i"
      :stat="stat"
      :name="stat.name"/>
  </div>
</template>

<script>
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import assign from 'lodash/assign'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  components: {
    MyelinPanel,
    StatBar: () => import('@/components/StatBar')
  },
  props: {
    stats: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      title: 'STATÜS MONITOR',
      size: {w: 325, h: 600, minh: 200, minw: 200},
      position: {x: 620, y: 100}
    }
  },

  computed: {
    hasStats () {
      return !isEmpty(this.stats)
    },

    sortedStats () {
      const named = map(this.stats, (stat, name) => assign({}, stat, {name}))
      const sorted = sortBy(named, 'type')
      sorted[sorted.length - 1].isLast = true
      return sorted
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.stats-container {
  .panel-content-container()
}
</style>
