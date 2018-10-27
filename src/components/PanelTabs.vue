<template>
  <div class="tab-container">
    <button
      :class="['tab', { active: currentTab === tab }]"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="$emit('tab', tab.component)">
      {{tab.toUpperCase()}}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true
    }
  }
}

</script>

<style lang="less" scoped>

</style>
