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
      :exits="exits"
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
      size: 8,
      mapData: null,
      exits: [],
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
      const size = (32 * 8) + 120
      return {
        minh: size,
        minw: size,
        h: size,
        w: size
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
      console.log('Updating map!')
      this.mapData = data.mapData
      this.areaName = data.areaName
      this.exits = data.exits
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
