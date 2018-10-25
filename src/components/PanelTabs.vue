<template>
  <div class="tab-container">
    <div
      :class="['tab', { active: currentTab === tab }]"
      v-for="(tab, index) in tabs"
      :key="index"
      @click="$emit('tab', tab)">
      {{tab.toUpperCase()}}
    </div>
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
