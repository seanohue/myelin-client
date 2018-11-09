<template>
<div>
  <div class="tab-container">
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="['tab', { active: tab.component === activePanel }]"
      @click="switchTo(tab)">{{tab.name.toUpperCase()}}</button>
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
@import '../app.less';

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
  font-size: 16px;
  line-height: 20px;
  background-color: @green-middle;
  border: 1px @term-background;
  color: @term-foreground;
}

.active {
  border: 2px @green-background;
  background-color: @term-foreground;
  color: @term-background;
}

.active:focus {
  box-shadow: 0 0 5px rgb(81, 238, 131);
  border-color: @green-foreground;
  outline: 0 none;
}
</style>
