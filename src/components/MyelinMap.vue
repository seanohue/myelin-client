<template>
  <div class="flex-grid">
    <div
      v-for="(column, i) in columns"
      :key="i"
      class="col">
      . <!-- Placeholder -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mapData: {
      required: true,
      type: Array
    }
  }
}
</script>
<style lang="less" scoped>

</style>
