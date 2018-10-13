<template>
  <div class="statbar-container">
    <div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['effect'],
  data () {
    return {}
  },
  computed: {
    difference () {
      if (_.isNil(this.stat.base)) return ''
      const diff = this.stat.current - this.stat.base
      if (diff === 0) return '(+0)'
      if (diff > 0) return `(+${diff})`
      return `(${diff})`
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';
.statbar-container {
  padding: 1px;
}
.stat-label {
  font-family: "BigBlue Terminal", "Roboto Mono", monospace;
}
.stat-value {
  float: right;
}
.divider {
  border-bottom: groove 1px;
}
</style>
