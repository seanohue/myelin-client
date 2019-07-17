<template>
  <div class="map-viewer-container">
    <div
      v-if="map.length > 1"
      class="map-container">
      <div
        v-for="(row, y) of fullMap"
        :key="y"
        class="map-row">
        <span
          v-for="(tile, x) of row"
          :key="x"
          :style="getTileStyle(tile)"
          class="map-tile" />
      </div>
    </div>
    <div class="compass">
      {{ compass }}
    </div>
  </div>
</template>

<script>

// Import all images from a directory
function importAll (r) {
  let images = {}
  r
    .keys()
    .map((item) => { images[item.replace('./', '')] = r(item) })
  return images
}

const images = importAll(require.context('@/assets/glyphs', false, /\.(gif|png|jpe?g|svg)$/))

export default {
  props: {
    map: {
      type: Array,
      default () {
        return [[]]
      }
    },
    size: {
      type: Number,
      default: 9
    },
    exits: {
      type: Array,
      default () {
        return []
      }
    }
  },

  computed: {
    hasMap () {
      return this.map.length > 1 && this.map[0].length > 1
    },
    fullMap () {
      if (!this.map) return

      // TODO: Diff the map for performance, eventually.
      const map = this.createEmpty2DArray(this.size)

      for (const point of this.map) {
        const {x, y} = point
        if (point.glyph === '.') point.glyph = 'default'
        map[y][x] = point
      }

      map.reverse()

      return this.centerOnPlayer(map)
    },

    compass () {
      console.log('Map comp:, ', {exits: this.exits, self: this})
      if (!(this.exits && this.exits.length)) {
        return 'none'
      }
      if (this.abbreviate) {
        return this.exits.map(exit => ({
          north: 'n',
          south: 's',
          west: 'w',
          east: 'e',
          up: 'u',
          down: 'd'
        }[exit]) || exit).join(' | ')
      }

      return this.exits.join(' | ')
    }
  },

  methods: {
    centerOnPlayer (map) {
      return map
    },

    hasPlayer (x, y) {
      const row = this.fullMap[y] || []
      const tile = row[x] || {}
      return tile.player
    },

    createEmpty2DArray (size) {
      console.log(`Creating map with dimensions of ${size}x${size}`)
      return Array(size)
        .fill()
        .map(() => Array(size)
          .fill()
          .map(this.createEmptyMapSquare))
    },

    createEmptyMapSquare () {
      return {
        glyph: 'empty'
      }
    },

    findPlayerTile (map) {
    },

    getTileStyle (tile) {
      const glyph = this.getTile(tile.glyph)
      const hasPlayer = tile.player
      if (hasPlayer) {
        return {
          'background-image': `url(${glyph})`
        }
      }

      let alpha = 0.5
      if (tile.neighbor) {
        alpha = 0.25
      }

      return {
        background: `linear-gradient( rgba(0, 0, 0, ${alpha}), rgba(0, 0, 0, ${alpha}) ), url(${glyph})`
      }
    },

    getTile (glyph) {
      return images[`${this.getGlyphName(glyph) || 'default'}.gif`]
    },

    getGlyphName (glyph) {
      return {
        '.': 'default',
        '#': 'empty'
      }[glyph || 'default'] || glyph
    }
  }
}
</script>

<style scoped>
  .map-viewer-container {
    justify-content: center;
    align-content: center;
    margin: 0;
  }

  .map-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: auto;
    justify-content: center;
  }

  .map-row {
    margin: 0;
    padding: 0;
    display: flex;
  }

  .map-tile {
    height: 32px;
    width: 32px;
    margin: 0;
    padding: 0;
  }

  .compass {
    background-color: rgba(0, 0 ,0, 0.75);
    color: whitesmoke;
  }
</style>
