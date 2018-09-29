<template>
  <MyelinPanel
    v-if="hasStats"
    title="VESSEL STATÜS MONITOR"
    :position="position"
    :size="size"
    :customhandles="['ml', 'mr']"
  >
    <div class="stats-container">
      <div v-for="(stat, name) in stats" :key="name">
        {{name}}: {{stat.current}}/{{stat.max}}
      </div>
    </div>
  </MyelinPanel>
</template>

<script>
import _ from 'lodash'
import MyelinPanel from '@/components/MyelinPanel'

export default {
  components: {MyelinPanel},
  data () {
    return {
      size: {w: 300, h: 600},
      position: {x: 600, y: 100},
      stats: {}
    }
  },

  computed: {
    hasStats () {
      return !_.isEmpty(this.stats)
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
