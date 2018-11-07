<template>
  <div class="tab-container">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="['tab', { active: tab.component === activePanel }]"
      @click="$emit('tab', tab.component)">
      {{tab.name.toUpperCase()}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activePanel: {
      type: String
    }
  }
}

</script>

<style lang="less" scoped>
.tab {
  font-family: 'Roboto Mono', monospace;
}
</style>
