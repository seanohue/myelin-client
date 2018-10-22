<template>
  <div class="statbar-container" :class="{divider: !stat.isLast}">
    <div v-if="isPool">
      <span class="stat-label">{{capName}}:</span> <span class="stat-value">{{stat.current}}/{{stat.max}}</span>
    </div>
    <div v-if="isStat">
      <span class="stat-label">{{capName}}:</span> <span class="stat-value">{{stat.current}} {{difference}}</span>
    </div>
  </div>
</template>

<script>
import capitalize from 'lodash-es/capitalize'
import isNil from 'lodash-es/isNil'

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    stat: {
      type: Object,
      required: true
    }
  },

  data () {
    return {}
  },

  computed: {
    capName () {
      return capitalize(this.name)
    },

    isPool () {
      return this.stat.type === 'pool'
    },
    isStat () {
      return this.stat.type === 'stat'
    },

    difference () {
      if (isNil(this.stat.base)) return ''
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
