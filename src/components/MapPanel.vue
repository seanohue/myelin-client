<template>
  <MyelinPanel
    v-if="hasMapData"
    :title="title"
    :position="position"
    :size="mapSize"
    :customhandles="['tl', 'tr']"
  >
    <MyelinMap
      :map="mapData"
      class="map-panel-container"
    />
  </MyelinPanel>
</template>

<script>
import MyelinPanel from '@/components/MyelinPanel'
import MyelinMap from '@/components/MyelinMap'

export default {
  components: {MyelinPanel, MyelinMap},
  data () {
    return {
      size: 3,
      mapData: null,
      areaName: '',
      position: {
        x: 1000,
        y: 100
      }
    }
  },
  computed: {
    hasMapData () {
      return Boolean(this.mapData)
    },
    mapSize () {
      const size = (buffer = 10) => (this.size * 36) + Math.min(buffer, this.title.length * 4)
      return {
        minh: size(),
        minw: size(),
        h: size(20),
        w: size(20)
      }
    },
    title () {
      return this.areaName.toUpperCase() || 'UNKNØWN AREA'
    }
  },
  created () {
    this.$bus.$on('map:change', this.updateMap)
  },
  methods: {
    updateMap (data) {
      this.mapData = data.mapData
      this.areaName = data.areaName
      this.size = data.size
      console.log({map: data})
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.map-panel-container {
  .panel-content-container()
}
</style>
