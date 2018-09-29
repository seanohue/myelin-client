<template>
  <MyelinPanel
    v-if="hasStats"
    title="STATÜS MONITOR"
    :position="position"
    :size="size"
    :customhandles="['ml', 'mr']"
  >
    <div class="stats-container">
      <StatBar v-for="(stat, i) in sortedStats" :key="i" :stat="stat" :name="stat.name">
      </StatBar>
    </div>
  </MyelinPanel>
</template>

<script>
import _ from 'lodash'
import MyelinPanel from '@/components/MyelinPanel'
import StatBar from '@/components/StatBar'

export default {
  components: {MyelinPanel, StatBar},
  data () {
    return {
      size: {w: 325, h: 600, minh: 400, minw: 200},
      position: {x: 600, y: 100},
      stats: {}
    }
  },

  computed: {
    hasStats () {
      return !_.isEmpty(this.stats)
    },

    sortedStats () {
      const named = _.map(this.stats, (stat, name) => {
        stat.name = name
        return stat
      })
      const sorted = _.sortBy(named, 'type')
      console.log({name, sorted})
      return sorted
    }
  },

  created () {
    this.$bus.$on('data:change', (data) => {
      if (!data) return
      if ('might' in data) {
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
