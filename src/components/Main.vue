<template>
  <div class="hello">
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      connected: false,
      message: 'Connecting...'
    }
  },

  created () {
    this.$bus.$on('connected', () => {
      console.log('connected')
      this.message = 'Connected!'
      this.connected = true
    })

    this.$bus.$on('message', m => {
      console.log(m)
    })

    this.$bus.$on('error', e => {
      this.message = e
      this.connected = false
    })

    this.$bus.$on('disconnected', () => {
      this.message = 'Disconnected.'
      this.connected = false
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
