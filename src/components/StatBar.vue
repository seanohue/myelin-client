<template>
  <div>
    <div v-if="isPool">
      {{name}}: {{stat.current}}/{{stat.max}}
    </div>
    <div v-if="isStat">
      {{name}}: {{stat.current}} {{difference}}
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: ['name', 'stat'],
  data () {
    return {}
  },
  computed: {
    isPool () {
      return this.stat.type === 'pool'
    },
    isStat () {
      return this.stat.type === 'stat'
    },

    difference () {
      if (_.isNil(this.stat.base)) return ''
      const diff = this.stat.current - this.stat.base
      if (diff === 0) return ''
      if (diff > 0) return `(+${diff})`
      return `(${diff})`
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

</style>
