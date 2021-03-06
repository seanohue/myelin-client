<template>
  <transition name="fade">
    <vue-draggable-resizable
      :w="width"
      :h="height"
      :x="x"
      :y="y"
      :minh="minh"
      :minw="minw"
      :handles="customhandles"
      drag-handle=".titlebar"
      @dragging="onDrag"
      @resizing="onResize"
    >
      <div class="titlebar">
        <span class="title">{{ title }}</span>
        <div
          v-if="minimizable"
          class="titlebar-button"
          @click="toggleMinimize()">{{ minIcon }}</div>
      </div>
      <div v-show="!minimized">
        <slot/>
      </div>
    </vue-draggable-resizable>
  </transition>
</template>

<script>
import get from 'lodash/get'
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  components: { VueDraggableResizable },
  props: {
    title: {
      type: String,
      default: 'ANZEIGE O.S.'
    },
    size: {
      type: Object,
      default: () => ({
        w: 200,
        h: 200,
        minh: 200,
        minw: 200
      })
    },
    position: {
      type: Object,
      default: () => ({
        x: 100,
        y: 100
      })
    },
    customhandles: {
      type: Array,
      default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
    },
    minimizable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      minimized: false,
      width: get(this, 'size.w', 200),
      height: get(this, 'size.h', 200),
      minh: get(this, 'size.minh', 50),
      minw: get(this, 'size.minw', 50),
      x: get(this, 'position.x', 0),
      y: get(this, 'position.y', 0),
      handles: get(this, 'customhandles')
    }
  },

  computed: {
    minIcon () {
      return this.minimized ? '^' : '-'
    }
  },

  methods: {
    onResize (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag (x, y) {
      this.x = x
      this.y = y
    },
    toggleMinimize () {
      this.minimized = !this.minimized
      const sfxName = this.minimized ? 'minimize' : 'maximize'
      this.$bus.$emit('audio:play', 'sfx', `${sfxName}panel`)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../app.less';

.titlebar {
  font-family: "BigBlue Terminal", "Roboto Mono", monospace;
  border-style: groove;
  background: linear-gradient(to right, @green-middle, @green-background);
  height: 16px;
  color: @term-foreground;
  padding: 2px;
  text-overflow: ellipsis;
  display: flex;
  justify-content: space-between;
}

.titlebar-button {
  border-style: groove;
  background-color: gray;
  text-align: center;
}

.title {
  align-self: flex-start;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
