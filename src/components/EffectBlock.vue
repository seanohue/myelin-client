<template>
  <div
    :class="{divider: !isLast}"
    class="effect-container">
    <div v-if="effect.remaining">
      <span class="effect-label">{{ effect.name }}</span>
      <span
        v-if="effect.remaining"
        class="effect-timing">{{ remainingTime }}</span>
    </div>
    <div v-else>
      <span class="effect-label">{{ effect.name }}</span>
      <span class="effect-timing">Permanent</span>
    </div>
  </div>
</template>

<script>
import partialRight from 'lodash/partialRight'
import get from 'lodash/get'
import Humanizer from 'humanize-duration-es6'

const h = new Humanizer({
  y: () => 'yr',
  mo: () => 'mo',
  w: () => 'wk',
  d: () => 'd',
  h: () => 'hr',
  m: () => 'min',
  s: () => 's',
  ms: () => 'ms',
  decimal: () => '.'
})
const humanize = partialRight(h.humanize.bind(h), {largest: 2, round: true})

export default {
  props: {
    effect: {
      type: Object,
      required: true
    },
    isLast: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    remainingTime () {
      const remaining = get(this, 'effect.remaining', 0)
      return humanize(remaining)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.effect-container {
  padding: 1px;
}
.effect-label {
  font-family: "BigBlue Terminal", "Roboto Mono", monospace;
}

.effect-timing {

  float: right;
}

.divider {
  border-bottom: groove 1px;
}
</style>
