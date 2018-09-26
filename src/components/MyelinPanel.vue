<template>
  <vue-draggable-resizable
    :w="width"
    :h="height"
    :x="x"
    :y="y"
    :minh="minh"
    :minw="minw"
    v-on:dragging="onDrag"
    v-on:resizing="onResize"
    drag-handle=".titlebar"
    :handles="customhandles"
  >
    <div class="titlebar">Panel</div>
    <slot></slot>
  </vue-draggable-resizable>
</template>

<script>
import _ from 'lodash'
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  components: { VueDraggableResizable },
  props: ['title', 'size', 'position', 'customhandles'],

  data () {
    console.log(this.size)
    return {
      width: _.get(this, 'size.w', 200),
      height: _.get(this, 'size.h', 200),
      minh: _.get(this, 'size.minh', 50),
      minw: _.get(this, 'size.minw', 50),
      x: _.get(this, 'position.x', 0),
      y: _.get(this, 'position.y', 0),
      handles: _.get(this, 'customhandles', ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])
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
    }
  }
}
</script>

<style lang="less" scoped>

</style>
