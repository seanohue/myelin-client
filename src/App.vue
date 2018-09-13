<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
body {
    background-color: gray;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #1ab874;
    &.router-link-exact-active {
      color: #07b667;
    }
  }
}
</style>
