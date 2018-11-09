<template>
<div>
  <div class="tab-container">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="['tab', { active: tab.component === activePanel }]"
      @click="switchTo(tab)">
      {{tab.name.toUpperCase()}}
    </button>
  </div>
  <slot></slot>
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
  },

  methods: {
    switchTo (tab) {
      console.log('Emitting', tab)
      this.$emit('tab', tab.component)
    }
  }
}

</script>

<style lang="less" scoped>
.tab-container {
  height: 26px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
.tab {
  align-content: center;
  display: flex;
  align-content: center;
  font-family: 'Roboto Mono', monospace;
}
</style>
